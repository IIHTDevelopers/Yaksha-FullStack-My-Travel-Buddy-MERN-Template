const express = require('express');
const router = express.Router();

const BookingController = require('../controller/booking.controller');
const bookingController = new BookingController();

router.get('/', bookingController.getAllBookings);
router.post('/', bookingController.createBooking);
router.get('/search', bookingController.searchBookings);
router.get('/upcoming', bookingController.getUpcomingBookingsForUser);
router.get('/:bookingId', bookingController.getBooking);
router.put('/:bookingId', bookingController.updateBooking);
router.delete('/:bookingId', bookingController.deleteBooking);

module.exports = router;
