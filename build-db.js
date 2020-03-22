const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const CsvReadableStream = require('csv-reader');
const Challenge = require('./models/Challenge');
const ParticipantTypes = require('./models/challenge/ParticipantTags');
const ChallengeTypes = require('./models/challenge/Types');


dotenv.config({ path: '.env.example' });

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

const mapResultTypeToChallengeType = {
  Success: ChallengeTypes.success,
  'Upload (z.B. Foto / Video)': ChallengeTypes.upload,
  Stückzahl: ChallengeTypes.amount,
  Zeit: ChallengeTypes.time,
  Freitext: ChallengeTypes.text,
};

function getParticipantKey(value) {
  if (Object.values(ParticipantTypes).filter((typeValue) => typeValue === value).length > 0) {
    return Object.keys(ParticipantTypes).find((key) => ParticipantTypes[key] === value);
  }
}

const stream = fs.createReadStream('./mongodb/Challenges.csv', 'utf8')
  .pipe(CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }));

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('open', async () => {
  let challengesBulk = Challenge.collection.initializeOrderedBulkOp();
  let counter = 0;

  stream.on('data', (data) => {

    const participantTagList = [
      getParticipantKey(data['Art der Herausforderung 1']),
      getParticipantKey(data['Herausforderungsopt. 2']),
      getParticipantKey(data['Herausforderungsopt. 3']),
    ].filter(Boolean);

    const participantTags = participantTagList.reduce(((previousValue, currentValue) => {
      previousValue[currentValue] = ParticipantTypes[currentValue];
      return previousValue;
    }), {});

    challengesBulk.insert({
      challengers: [],
      title: data['Alternativer name'] === '' ? data.Name : data['Alternativer name'],
      description: data.Beschreibung,
      category: data.Kategorie,
      type: mapResultTypeToChallengeType[data.Ergebnistyp],
      score: 100,
      participantTags,
    });

    counter++;

    if (counter % 1000 === 0) {
      stream.pause(); // lets stop reading from file until we finish writing this batch to db

      challengesBulk.execute((err) => {
        if (err) throw err; // or do something
        // possibly do something with result
        challengesBulk = Challenge.collection.initializeOrderedBulkOp();

        stream.resume(); // continue to read from file
      });
    }
  });

  stream.on('end', async () => {
    if (counter % 1000 !== 0) {
      await challengesBulk.execute((err) => {
        if (err) throw err; // or something
        process.exit(0);
      });
    } else {
      process.exit(0);
    }
  });

  stream.on('error', (err) => {
    console.log(err);
  });
});
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
