const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: mongoose.Schema.Types.ObjectId, ref: 'Destination', required: true },
    rating: { type: Number, required: true },
    comment: String,
    helpfulVotes: Number,
});

module.exports = ReviewSchema;
