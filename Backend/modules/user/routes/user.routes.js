const express = require('express');
const router = express.Router();

const UserController = require('../controller/user.controller');
const userController = new UserController();

router.post('/', userController.createUser);
router.get('/upcoming-trips', userController.getUpcomingTrips);
router.get('/past-trips', userController.getPastTrips);
router.get('/all-trips', userController.getTripPlans);
router.get('/bookings', userController.getUserBookings);
router.get('/reviews', userController.getUserReviews);
router.get('/', userController.getUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

module.exports = router;
