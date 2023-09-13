const express = require('express');
const router = require('../../modules/review/routes/review.routes');

const ReviewController = require('../../modules/review/controller/review.controller');
const ReviewServiceImpl = require('../../modules/review/service/impl/review.serviceImpl');
const authGuard = require('../../modules/auth/middleware/auth.guard');

const app = express();
app.use(express.json());
app.use(authGuard);

app.use(router);

jest.mock('../../modules/review/service/impl/review.serviceImpl');

let reviewControllerBoundaryTest = `Review boundary test`;
describe('Review Controller', () => {
    describe('boundary', () => {
        it(`${reviewControllerBoundaryTest} should create a new review`, async () => {
            const mReq = {
                body: {
                    user: 'userId',
                    destination: 'New York',
                    rating: 5,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockReview = {
                _id: 'mockReviewId',
                ...mReq.body,
            };
            ReviewServiceImpl.prototype.createReview.mockResolvedValueOnce(mockReview);
            await new ReviewController().createReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.createReview).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockReview);
        });

        it(`${reviewControllerBoundaryTest} should return a 400 error when missing required fields`, async () => {
            const mReq = {
                body: {
                    user: 'userId',
                    destination: 'New York',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await new ReviewController().createReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.createReview).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User, destination and rating are required.' });
        });

        it(`${reviewControllerBoundaryTest} should return a 500 error when createReview fails`, async () => {
            const mReq = {
                body: {
                    user: 'userId',
                    destination: 'New York',
                    rating: 5,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to create review.');
            ReviewServiceImpl.prototype.createReview.mockRejectedValueOnce(error);
            await new ReviewController().createReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.createReview).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create review.' });
        });

        it(`${reviewControllerBoundaryTest} should get a review by ID`, async () => {
            const mockReviewId = 'mockReviewId';
            const mReq = {
                params: { reviewId: mockReviewId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockReview = {
                _id: mockReviewId,
                user: 'userId',
                destination: 'New York',
                rating: 4,
                // ... Other review properties
            };
            ReviewServiceImpl.prototype.getReview.mockResolvedValueOnce(mockReview);
            await new ReviewController().getReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.getReview).toHaveBeenCalledWith(mockReviewId);
            expect(mRes.json).toHaveBeenCalledWith(mockReview);
        });

        it(`${reviewControllerBoundaryTest} should return a 404 error when getReview fails`, async () => {
            const mockReviewId = 'mockReviewId';
            const mReq = {
                params: { reviewId: mockReviewId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Review not found...');
            ReviewServiceImpl.prototype.getReview.mockRejectedValueOnce(error);
            await new ReviewController().getReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.getReview).toHaveBeenCalledWith(mockReviewId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Review not found...' });
        });

        it(`${reviewControllerBoundaryTest} should update a review`, async () => {
            const mockReviewId = 'mockReviewId';
            const mReq = {
                params: { reviewId: mockReviewId },
                body: { rating: 5 },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockUpdatedReview = {
                _id: mockReviewId,
                user: 'userId',
                destination: 'New York',
                rating: 5,
                // ... Other review properties
            };
            ReviewServiceImpl.prototype.updateReview.mockResolvedValueOnce(mockUpdatedReview);
            await new ReviewController().updateReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.updateReview).toHaveBeenCalledWith(mockReviewId, mReq.body);
            expect(mRes.json).toHaveBeenCalledWith(mockUpdatedReview);
        });

        it(`${reviewControllerBoundaryTest} should return a 500 error when updateReview fails`, async () => {
            const mockReviewId = 'mockReviewId';
            const mReq = {
                params: { reviewId: mockReviewId },
                body: { rating: 5 },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to update review details.');
            ReviewServiceImpl.prototype.updateReview.mockRejectedValueOnce(error);
            await new ReviewController().updateReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.updateReview).toHaveBeenCalledWith(mockReviewId, mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to update review details.' });
        });

        it(`${reviewControllerBoundaryTest} should delete a review and return the deleted review`, async () => {
            const mockReviewId = 'mockReviewId';
            const mReq = {
                params: { reviewId: mockReviewId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockDeletedReview = {
                _id: mockReviewId,
                // ... Other properties of the deleted review
            };
            ReviewServiceImpl.prototype.deleteReview.mockResolvedValueOnce(mockDeletedReview);
            await new ReviewController().deleteReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.deleteReview).toHaveBeenCalledWith(mockReviewId);
            expect(mRes.json).toHaveBeenCalledWith(mockDeletedReview);
        });

        it(`${reviewControllerBoundaryTest} should return a 404 error when deleteReview fails`, async () => {
            const mockReviewId = 'mockReviewId';
            const mReq = {
                params: { reviewId: mockReviewId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Review not found.');
            ReviewServiceImpl.prototype.deleteReview.mockRejectedValueOnce(error);
            await new ReviewController().deleteReview(mReq, mRes);
            expect(ReviewServiceImpl.prototype.deleteReview).toHaveBeenCalledWith(mockReviewId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Review not found.' });
        });

        it(`${reviewControllerBoundaryTest} should search reviews by destination`, async () => {
            const destinationName = 'New York';
            const mReq = {
                query: { destinationName },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockReviews = [
                {
                    _id: 'reviewId1',
                    user: 'userId1',
                    destination: destinationName,
                    rating: 4,
                },
                {
                    _id: 'reviewId2',
                    user: 'userId2',
                    destination: destinationName,
                    rating: 5,
                },
            ];
            ReviewServiceImpl.prototype.searchReviewsByDestination.mockResolvedValueOnce(mockReviews);
            await new ReviewController().searchReviewsByDestination(mReq, mRes);
            expect(ReviewServiceImpl.prototype.searchReviewsByDestination).toHaveBeenCalledWith(destinationName);
            expect(mRes.json).toHaveBeenCalledWith(mockReviews);
        });

        it(`${reviewControllerBoundaryTest} should return a 500 error when searchReviewsByDestination fails`, async () => {
            const destinationName = 'New York';
            const mReq = {
                query: { destinationName },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search reviews by destination.');
            ReviewServiceImpl.prototype.searchReviewsByDestination.mockRejectedValueOnce(error);
            await new ReviewController().searchReviewsByDestination(mReq, mRes);
            expect(ReviewServiceImpl.prototype.searchReviewsByDestination).toHaveBeenCalledWith(destinationName);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search reviews by destination.' });
        });

        it(`${reviewControllerBoundaryTest} should search reviews by rating`, async () => {
            const minRating = 3;
            const maxRating = 5;
            const mReq = {
                query: { min: minRating, max: maxRating },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockReviews = [
                {
                    _id: 'reviewId1',
                    user: 'userId1',
                    destination: 'New York',
                    rating: 4,
                },
                {
                    _id: 'reviewId2',
                    user: 'userId2',
                    destination: 'Paris',
                    rating: 5,
                },
            ];
            ReviewServiceImpl.prototype.searchReviewsByRating.mockResolvedValueOnce(mockReviews);
            await new ReviewController().searchReviewsByRating(mReq, mRes);
            expect(ReviewServiceImpl.prototype.searchReviewsByRating).toHaveBeenCalledWith(minRating, maxRating);
            expect(mRes.json).toHaveBeenCalledWith(mockReviews);
        });

        it(`${reviewControllerBoundaryTest} should return a 400 error when missing min and max ratings for searchReviewsByRating`, async () => {
            const mReq = {
                query: {},
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await new ReviewController().searchReviewsByRating(mReq, mRes);
            expect(ReviewServiceImpl.prototype.searchReviewsByRating).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Min and max rating are required.' });
        });

        it(`${reviewControllerBoundaryTest} should return a 500 error when searchReviewsByRating fails`, async () => {
            const minRating = 3;
            const maxRating = 5;
            const mReq = {
                query: { min: minRating, max: maxRating },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search reviews by rating.');
            ReviewServiceImpl.prototype.searchReviewsByRating.mockRejectedValueOnce(error);
            await new ReviewController().searchReviewsByRating(mReq, mRes);
            expect(ReviewServiceImpl.prototype.searchReviewsByRating).toHaveBeenCalledWith(minRating, maxRating);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search reviews by rating.' });
        });

        it(`${reviewControllerBoundaryTest} should get all reviews`, async () => {
            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mockReviews = [
                {
                    _id: 'reviewId1',
                    user: 'userId1',
                    destination: 'New York',
                    rating: 4,
                },
                {
                    _id: 'reviewId2',
                    user: 'userId2',
                    destination: 'Paris',
                    rating: 5,
                },
            ];
            ReviewServiceImpl.prototype.getAllReviews.mockResolvedValueOnce(mockReviews);
            await new ReviewController().getAllReviews(mReq, mRes);
            expect(ReviewServiceImpl.prototype.getAllReviews).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockReviews);
        });

        it(`${reviewControllerBoundaryTest} should return a 500 error when getAllReviews fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to get all reviews.');
            ReviewServiceImpl.prototype.getAllReviews.mockRejectedValueOnce(error);
            await new ReviewController().getAllReviews(mReq, mRes);
            expect(ReviewServiceImpl.prototype.getAllReviews).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get all reviews.' });
        });
    });
});
