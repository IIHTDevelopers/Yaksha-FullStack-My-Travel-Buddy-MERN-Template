const mongoose = require('mongoose');

const TripPlanSchema = new mongoose.Schema({
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startDate: Date,
    endDate: Date,
    activities: [String],
    accommodations: {
        hotel: String,
        checkInDate: Date,
        checkOutDate: Date,
    },
});

module.exports = TripPlanSchema;
