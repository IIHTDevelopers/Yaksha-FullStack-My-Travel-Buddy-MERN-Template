const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    tokens: [{ type: String }],
    trips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TripPlan' }],
    bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const hashedPassword = await bcrypt.hash(this.password, 10);
            this.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

UserSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
};

module.exports = UserSchema;
