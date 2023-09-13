const express = require('express');
const router = express.Router();
const ReviewController = require('../controller/review.controller');

const reviewController = new ReviewController();

router.get('/', reviewController.getAllReviews);
router.post('/', reviewController.createReview);
router.get('/search', reviewController.searchReviewsByDestination);
router.get('/search/rating', reviewController.searchReviewsByRating);
router.get('/:reviewId', reviewController.getReview);
router.put('/:reviewId', reviewController.updateReview);
router.delete('/:reviewId', reviewController.deleteReview);

module.exports = router;
