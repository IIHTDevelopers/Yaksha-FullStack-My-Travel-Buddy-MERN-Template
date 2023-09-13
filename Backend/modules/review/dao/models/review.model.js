var mongoose = require('mongoose');

var ReviewModel = require('../schemas/review.schema');
module.exports = mongoose.model('Review', ReviewModel); 