const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    category: String,
    budget: Number,
    imageUrl: String,
    attractions: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = DestinationSchema;
