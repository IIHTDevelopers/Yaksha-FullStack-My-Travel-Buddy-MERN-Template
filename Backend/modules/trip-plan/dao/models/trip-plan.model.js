var mongoose = require('mongoose');

var TripPlanModel = require('../schemas/trip-plan.schema');
module.exports = mongoose.model('TripPlan', TripPlanModel); 