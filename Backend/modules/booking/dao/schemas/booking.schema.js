const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    date: Date,
    status: String,
    flightDetails: {
        airline: String,
        flightNumber: String,
        departureDate: Date,
        arrivalDate: Date,
    },
    accommodationDetails: {
        hotel: String,
        checkInDate: Date,
        checkOutDate: Date,
    },
});

module.exports = BookingSchema;
