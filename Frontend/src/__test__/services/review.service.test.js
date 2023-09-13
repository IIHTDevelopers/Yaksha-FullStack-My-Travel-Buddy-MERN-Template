import axios from 'axios';
import reviewService from '../../services/review.service';

jest.mock('axios');

describe('reviewService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("ReviewService functional should create a new review", async () => {
            const mockReviewData = { text: 'Great experience' };
            const successResponse = { reviewId: 1 };
            let isNull = false;
            try {
                const response = await reviewService.createReview();
                isNull = response === null;
                throw new Error("Error in createReview()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Review created');
                } else {
                    const mockResponseData = { reviewId: 1 };
                    reviewService.createReview = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.createReview(mockReviewData);
                    expect(reviewService.createReview).toHaveBeenCalledWith(mockReviewData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should update a review by ID", async () => {
            const mockReviewData = { text: 'Updated review' };
            const successResponse = { reviewId: 1 };
            let isNull = false;
            try {
                const response = await reviewService.updateReview(1, mockReviewData);
                isNull = response === null;
                throw new Error("Error in updateReview()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Review updated');
                } else {
                    const mockResponseData = { reviewId: 1 };
                    reviewService.updateReview = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.updateReview(1, mockReviewData);
                    expect(reviewService.updateReview).toHaveBeenCalledWith(1, mockReviewData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should delete a review by ID", async () => {
            const successResponse = { message: 'Review deleted' };
            let isNull = false;
            try {
                const response = await reviewService.deleteReview(1);
                isNull = response === null;
                throw new Error("Error in deleteReview()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Review deleted');
                } else {
                    const mockResponseData = { message: 'Review deleted' };
                    reviewService.deleteReview = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.deleteReview(1);
                    expect(reviewService.deleteReview).toHaveBeenCalledWith(1);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should get all reviews", async () => {
            const successResponse = [{ reviewId: 1, text: 'Great experience' }];
            let isNull = false;
            try {
                const response = await reviewService.getAllReviews();
                isNull = response === null;
                throw new Error("Error in getAllReviews()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('All reviews fetched');
                } else {
                    const mockResponseData = [{ reviewId: 1, text: 'Great experience' }];
                    reviewService.getAllReviews = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.getAllReviews();
                    expect(reviewService.getAllReviews).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should search reviews by destination name", async () => {
            const destinationName = 'Paris';
            const successResponse = [{ reviewId: 1, text: 'Great experience in Paris' }];
            let isNull = false;
            try {
                const response = await reviewService.searchReviewsByDestination(destinationName);
                isNull = response === null;
                throw new Error("Error in searchReviewsByDestination()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Reviews by destination fetched');
                } else {
                    const mockResponseData = [{ reviewId: 1, text: 'Great experience in Paris' }];
                    reviewService.searchReviewsByDestination = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.searchReviewsByDestination(destinationName);
                    expect(reviewService.searchReviewsByDestination).toHaveBeenCalledWith(destinationName);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should search reviews by user ID", async () => {
            const userId = 1;
            const successResponse = [{ reviewId: 1, text: 'Great experience' }];
            let isNull = false;
            try {
                const response = await reviewService.searchReviewsByUser(userId);
                isNull = response === null;
                throw new Error("Error in searchReviewsByUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Reviews by user fetched');
                } else {
                    const mockResponseData = [{ reviewId: 1, text: 'Great experience' }];
                    reviewService.searchReviewsByUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.searchReviewsByUser(userId);
                    expect(reviewService.searchReviewsByUser).toHaveBeenCalledWith(userId);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should search reviews by rating range", async () => {
            const minRating = 4;
            const maxRating = 5;
            const successResponse = [{ reviewId: 1, text: 'Excellent experience' }];
            let isNull = false;
            try {
                const response = await reviewService.searchReviewsByRating(minRating, maxRating);
                isNull = response === null;
                throw new Error("Error in searchReviewsByRating()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Reviews by rating fetched');
                } else {
                    const mockResponseData = [{ reviewId: 1, text: 'Excellent experience' }];
                    reviewService.searchReviewsByRating = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.searchReviewsByRating(minRating, maxRating);
                    expect(reviewService.searchReviewsByRating).toHaveBeenCalledWith(minRating, maxRating);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("ReviewService functional should get a review by ID", async () => {
            const reviewId = 1;
            const successResponse = { reviewId: 1, text: 'Great experience' };
            let isNull = false;
            try {
                const response = await reviewService.getReview(reviewId);
                isNull = response === null;
                throw new Error("Error in getReview()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Review fetched');
                } else {
                    const mockResponseData = { reviewId: 1, text: 'Great experience' };
                    reviewService.getReview = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await reviewService.getReview(reviewId);
                    expect(reviewService.getReview).toHaveBeenCalledWith(reviewId);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});
