const ReviewModel = require("../../modules/review/dao/models/review.model");
const UserModel = require("../../modules/user/dao/models/user.model");
const ReviewServiceImpl = require("../../modules/review/service/impl/review.serviceImpl");

jest.mock("../../modules/review/dao/models/review.model");
jest.mock("../../modules/user/dao/models/user.model");

let reviewServiceBoundaryTest = `ReviewService functional test`;

describe('Review Service', () => {
    let reviewService;

    beforeEach(() => {
        reviewService = new ReviewServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        const reviewData = {
            user: 'user_id',
            destination: 'destination_id',
            rating: 4,
            content: 'Great experience!',
        };

        it(`${reviewServiceBoundaryTest} should create a new review`, async () => {
            const review = {
                _id: 'review_id',
                ...reviewData,
            };
            const user = {
                _id: 'user_id',
                reviews: [],
            };
            UserModel.findByIdAndUpdate.mockResolvedValue(user);
            ReviewModel.create.mockResolvedValue(review);
            const result = await reviewService.createReview(reviewData);
            expect(result).toEqual(review);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to create a review`, async () => {
            const error = new Error('Failed to create review.');
            UserModel.findByIdAndUpdate.mockRejectedValue(error);
            ReviewModel.create.mockRejectedValue(error);
            await expect(reviewService.createReview(reviewData)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should get review by ID`, async () => {
            const reviewId = 'review_id';
            const review = {
                _id: reviewId,
                ...reviewData,
            };
            ReviewModel.findById.mockResolvedValue(review);
            const result = await reviewService.getReview(reviewId);
            expect(result).toEqual(review);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to get review details`, async () => {
            const reviewId = 'non_existing_review_id';
            const error = new Error('Failed to get review details.');
            ReviewModel.findById.mockRejectedValue(error);
            await expect(reviewService.getReview(reviewId)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should update review by ID`, async () => {
            const reviewId = 'review_id';
            const updatedReview = {
                rating: 5,
                content: 'Amazing experience!',
            };
            const review = {
                _id: reviewId,
                ...updatedReview,
            };
            ReviewModel.findByIdAndUpdate.mockResolvedValue(review);
            const result = await reviewService.updateReview(reviewId, updatedReview);
            expect(result).toEqual(review);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to update review details`, async () => {
            const reviewId = 'non_existing_review_id';
            const updatedReview = {
                rating: 5,
                content: 'Amazing experience!',
            };
            const error = new Error('Failed to update review details.');
            ReviewModel.findByIdAndUpdate.mockRejectedValue(error);
            await expect(reviewService.updateReview(reviewId, updatedReview)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should delete review by ID`, async () => {
            const reviewId = 'review_id';
            const review = {
                _id: reviewId,
                ...reviewData,
            };
            UserModel.findByIdAndUpdate.mockResolvedValue({
                reviews: [reviewId],
            });
            ReviewModel.findByIdAndDelete.mockResolvedValue(review);
            const result = await reviewService.deleteReview(reviewId);
            expect(result).toEqual(review);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to delete review`, async () => {
            const reviewId = 'non_existing_review_id';
            const error = new Error('Failed to delete review.');
            UserModel.findByIdAndUpdate.mockResolvedValue({
                reviews: [],
            });
            ReviewModel.findByIdAndDelete.mockRejectedValue(error);
            await expect(reviewService.deleteReview(reviewId)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should search reviews by destination name`, async () => {
            const destinationName = 'awesome destination';
            const reviews = [
                {
                    _id: 'review_id_1',
                    ...reviewData,
                    destination: 'destination_id_1',
                },
                {
                    _id: 'review_id_2',
                    ...reviewData,
                    destination: 'destination_id_2',
                },
            ];
            ReviewModel.aggregate.mockResolvedValue(reviews);
            const result = await reviewService.searchReviewsByDestination(destinationName);
            expect(result).toEqual(reviews);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to search reviews by destination name`, async () => {
            const destinationName = 'non_existing_destination';
            const error = new Error('Failed to search reviews by destination name.');
            ReviewModel.aggregate.mockRejectedValue(error);
            await expect(reviewService.searchReviewsByDestination(destinationName)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should search reviews by user`, async () => {
            const userId = 'user_id';
            const reviews = [
                {
                    _id: 'review_id_1',
                    ...reviewData,
                },
                {
                    _id: 'review_id_2',
                    ...reviewData,
                },
            ];
            ReviewModel.find.mockResolvedValue(reviews);
            const result = await reviewService.searchReviewsByUser(userId);
            expect(result).toEqual(reviews);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to search reviews by user`, async () => {
            const userId = 'non_existing_user_id';
            const error = new Error('Failed to search reviews by user.');
            ReviewModel.find.mockRejectedValue(error);
            await expect(reviewService.searchReviewsByUser(userId)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should search reviews by rating range`, async () => {
            const minRating = 3;
            const maxRating = 5;
            const reviews = [
                {
                    _id: 'review_id_1',
                    ...reviewData,
                    rating: 4,
                },
                {
                    _id: 'review_id_2',
                    ...reviewData,
                    rating: 5,
                },
            ];
            ReviewModel.find.mockResolvedValue(reviews);
            const result = await reviewService.searchReviewsByRating(minRating, maxRating);
            expect(result).toEqual(reviews);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to search reviews by rating`, async () => {
            const minRating = 1;
            const maxRating = 2;
            const error = new Error('Failed to search reviews by rating.');
            ReviewModel.find.mockRejectedValue(error);
            await expect(reviewService.searchReviewsByRating(minRating, maxRating)).rejects.toThrow(error);
        });

        it(`${reviewServiceBoundaryTest} should get all reviews`, async () => {
            const reviews = [
                {
                    _id: 'review_id_1',
                    ...reviewData,
                },
                {
                    _id: 'review_id_2',
                    ...reviewData,
                },
            ];
            ReviewModel.find.mockResolvedValue(reviews);
            const result = await reviewService.getAllReviews();
            expect(result).toEqual(reviews);
        });

        it(`${reviewServiceBoundaryTest} should throw an error when failing to get all reviews`, async () => {
            const error = new Error('Failed to get all reviews.');
            ReviewModel.find.mockRejectedValue(error);
            await expect(reviewService.getAllReviews()).rejects.toThrow(error);
        });
    });
});
