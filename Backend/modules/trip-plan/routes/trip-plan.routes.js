const express = require('express');
const router = express.Router();

const TripPlanController = require('../controller/trip-plan.controller');

const tripPlanController = new TripPlanController();

router.post('/', tripPlanController.createTripPlan);
router.get('/popular', tripPlanController.getPopularTripPlans);
router.get('/search', tripPlanController.searchTripPlansByDestination);
router.get('/me', tripPlanController.getTripPlansByUser);
router.get('/', tripPlanController.getAllTripPlans);
router.get('/:tripPlanId', tripPlanController.getTripPlan);
router.put('/:tripPlanId', tripPlanController.updateTripPlan);
router.delete('/:tripPlanId', tripPlanController.deleteTripPlan);

module.exports = router;
