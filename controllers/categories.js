const ChallengeCategory = require('../models/ChallengeCategory');
/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  const challengeCategoryList = [{
    _id: 1,
    name: 'Zuhause / @home',
    description: ''
  }, {
    _id: 2,
    name: 'Roberts Koch-Institut',
    description: ''
  }, {
    _id: 3,
    name: 'kreativer Kopf/Einfallsreichtum',
    description: ''
  }, {
    _id: 4,
    name: 'Know-how',
    description: ''
  }, {
    _id: 5,
    name: 'Move move move',
    description: ''
  }, {
    _id: 6,
    name: 'Do it for yourself',
    description: ''
  }, {
    _id: 7,
    name: 'Soziale Kontakte',
    description: ''
  }];
  res.render('categories', {
    title: 'categories',
    categories: challengeCategoryList
  });
};
