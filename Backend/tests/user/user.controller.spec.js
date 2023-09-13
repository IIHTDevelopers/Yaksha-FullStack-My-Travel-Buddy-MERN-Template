const express = require('express');
const router = require('../../modules/user/routes/user.routes');

const UserController = require('../../modules/user/controller/user.controller');
const UserServiceImpl = require('../../modules/user/service/impl/user.serviceImpl');
const authGuard = require('../../modules/auth/middleware/auth.guard');

const app = express();
app.use(express.json());
app.use(authGuard);

app.use(router);

jest.mock('../../modules/user/service/impl/user.serviceImpl');

let tripPlanControllerBoundaryTest = `TripPlan boundary test`;
describe('User Controller', () => {
    describe('boundary', () => {
        it(`${tripPlanControllerBoundaryTest} should create a new user`, async () => {
            const mReq = {
                body: {
                    username: 'newuser',
                    email: 'newuser@example.com',
                    password: 'password',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const mockUser = {
                _id: 'mockUserId',
                ...mReq.body,
            };
            UserServiceImpl.prototype.createUser.mockResolvedValueOnce(mockUser);
            await new UserController().createUser(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.createUser).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 400 error when missing required fields`, async () => {
            const mReq = {
                body: {
                    username: 'newuser',
                    email: 'newuser@example.com',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            await new UserController().createUser(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.createUser).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Username, email, and password are required.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when createUser fails`, async () => {
            const mReq = {
                body: {
                    username: 'newuser',
                    email: 'newuser@example.com',
                    password: 'password',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const error = new Error('Failed to create user.');
            UserServiceImpl.prototype.createUser.mockRejectedValueOnce(error);
            await new UserController().createUser(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.createUser).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create user.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should get a user by ID`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockUser = {
                _id: mockUserId,
                username: 'testuser',
                email: 'testuser@example.com',
                // ... Other user properties
            };

            UserServiceImpl.prototype.getUser.mockResolvedValueOnce(mockUser);

            await new UserController().getUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 404 error when getUser fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const error = new Error('User not found.');
            UserServiceImpl.prototype.getUser.mockRejectedValueOnce(error);

            await new UserController().getUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.getUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should update user email when user exists with new email`, async () => {
            const mockUserId = 'mockUserId';
            const mockNewEmail = 'newemail@example.com';
            const mReq = {
                user: { _id: mockUserId },
                body: { email: mockNewEmail },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const mockExistingUserWithEmail = {
                _id: 'existingUserId',
                email: mockNewEmail,
            };
            UserServiceImpl.prototype.getUserByEmail.mockResolvedValueOnce(mockExistingUserWithEmail);
            UserServiceImpl.prototype.updateUser.mockResolvedValueOnce(mockExistingUserWithEmail);
            await new UserController().updateUser(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.getUserByEmail).toHaveBeenCalledWith(mockNewEmail);
            expect(UserServiceImpl.prototype.updateUser).toHaveBeenCalledWith(mockUserId, mReq.body);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockExistingUserWithEmail);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 400 error when user with new email does not exist`, async () => {
            const mockUserId = 'mockUserId';
            const mockNewEmail = 'newemail@example.com';
            const mReq = {
                user: { _id: mockUserId },
                body: { email: mockNewEmail },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            UserServiceImpl.prototype.getUserByEmail.mockResolvedValueOnce(null);
            await new UserController().updateUser(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.getUserByEmail).toHaveBeenCalledWith(mockNewEmail);
            expect(UserServiceImpl.prototype.updateUser).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Email cannot be updated.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should delete user and return the deleted user`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockDeletedUser = {
                _id: mockUserId,
                // ... Other properties of the deleted user
            };

            UserServiceImpl.prototype.deleteUser.mockResolvedValueOnce(mockDeletedUser);

            await new UserController().deleteUser(mReq, mRes, mNext);

            expect(UserServiceImpl.prototype.deleteUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockDeletedUser);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 404 error when deleteUser fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            UserServiceImpl.prototype.deleteUser.mockRejectedValueOnce(new Error('Deletion failed'));
            await new UserController().deleteUser(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.deleteUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should get user\'s upcoming trips`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();
            const mockUpcomingTrips = [
                {
                    tripId: 'trip123',
                    destination: 'New York',
                    startDate: new Date('2023-09-15'),
                    endDate: new Date('2023-09-20'),
                },
                {
                    tripId: 'trip456',
                    destination: 'Paris',
                    startDate: new Date('2023-10-01'),
                    endDate: new Date('2023-10-10'),
                },
            ];
            UserServiceImpl.prototype.getUpcomingTrips.mockResolvedValueOnce(mockUpcomingTrips);
            await new UserController().getUpcomingTrips(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.getUpcomingTrips).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockUpcomingTrips);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getUpcomingTrips fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();
            const mockError = new Error('Failed to get upcoming trips');
            UserServiceImpl.prototype.getUpcomingTrips.mockRejectedValueOnce(mockError);
            await new UserController().getUpcomingTrips(mReq, mRes, mNext);
            expect(UserServiceImpl.prototype.getUpcomingTrips).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get user\'s upcoming trips.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return past trips for the user`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockPastTrips = [
                {
                    tripId: 'trip1',
                    destination: 'Mock Destination 1',
                    date: '2023-08-01',
                },
                {
                    tripId: 'trip2',
                    destination: 'Mock Destination 2',
                    date: '2023-07-15',
                },
            ];
            UserServiceImpl.prototype.getPastTrips.mockResolvedValueOnce(mockPastTrips);
            await new UserController().getPastTrips(mReq, mRes);
            expect(UserServiceImpl.prototype.getPastTrips).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockPastTrips);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getting past trips fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockError = new Error('Failed to fetch past trips');
            UserServiceImpl.prototype.getPastTrips.mockRejectedValueOnce(mockError);
            await new UserController().getPastTrips(mReq, mRes);
            expect(UserServiceImpl.prototype.getPastTrips).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get user\'s past trips.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get user\'s trip plans`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockTripPlans = [
                {
                    _id: 'tripPlanId1',
                    destination: 'New York',
                    startDate: new Date('2023-09-01'),
                    endDate: new Date('2023-09-10'),
                },
                {
                    _id: 'tripPlanId2',
                    destination: 'Paris',
                    startDate: new Date('2023-10-15'),
                    endDate: new Date('2023-10-25'),
                },
            ];
            UserServiceImpl.prototype.getTripPlans.mockResolvedValueOnce(mockTripPlans);
            await new UserController().getTripPlans(mReq, mRes);
            expect(UserServiceImpl.prototype.getTripPlans).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockTripPlans);
            expect(mRes.status).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getting user\'s trip plans fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockError = new Error('Failed to get trip plans');
            UserServiceImpl.prototype.getTripPlans.mockRejectedValueOnce(mockError);
            await new UserController().getTripPlans(mReq, mRes);
            expect(UserServiceImpl.prototype.getTripPlans).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get user\'s trip plans.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get user\'s bookings`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockBookings = [
                {
                    _id: 'bookingId1',
                    tripPlan: 'tripPlanId1', // Referencing the trip plan from mockTripPlans
                    user: 'userId1', // Replace with actual user ID
                    date: new Date('2023-08-20'),
                },
                {
                    _id: 'bookingId2',
                    tripPlan: 'tripPlanId2',
                    user: 'userId2', // Replace with actual user ID
                    date: new Date('2023-09-05'),
                },
            ];
            UserServiceImpl.prototype.getUserBookings.mockResolvedValueOnce(mockBookings);
            await new UserController().getUserBookings(mReq, mRes);
            expect(UserServiceImpl.prototype.getUserBookings).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockBookings);
            expect(mRes.status).not.toHaveBeenCalled();
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getting user\'s bookings fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockError = new Error('Failed to get bookings');
            UserServiceImpl.prototype.getUserBookings.mockRejectedValueOnce(mockError);
            await new UserController().getUserBookings(mReq, mRes);
            expect(UserServiceImpl.prototype.getUserBookings).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get user\'s bookings.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get user reviews`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                body: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockReviews = [
                {
                    _id: 'reviewId1',
                    userId: 'userId1',
                    content: 'This is a great product!',
                    rating: 5,
                },
                {
                    _id: 'reviewId2',
                    userId: 'userId2',
                    content: 'Not satisfied with the quality.',
                    rating: 2,
                },
            ];
            UserServiceImpl.prototype.getUserReviews.mockResolvedValueOnce(mockReviews);
            await new UserController().getUserReviews(mReq, mRes);
            expect(UserServiceImpl.prototype.getUserReviews).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockReviews);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getUserReviews fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                body: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockError = new Error('Failed to fetch reviews');
            UserServiceImpl.prototype.getUserReviews.mockRejectedValueOnce(mockError);
            await new UserController().getUserReviews(mReq, mRes);
            expect(UserServiceImpl.prototype.getUserReviews).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: "Failed to get user's reviews." });
        });
    });
});
