var mongoose = require('mongoose');

var DestinationModel = require('../schemas/destination.schema');
module.exports = mongoose.model('Destination', DestinationModel); 