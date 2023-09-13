var mongoose = require('mongoose');

var BookingModel = require('../schemas/booking.schema');
module.exports = mongoose.model('Booking', BookingModel); 