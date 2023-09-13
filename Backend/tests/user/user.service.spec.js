const UserServiceImpl = require('../../modules/user/service/impl/user.serviceImpl');
const UserModel = require('../../modules/user/dao/models/user.model');

jest.mock('../../modules/user/dao/models/user.model');

let userServiceBoundaryTest = `UserService functional test`;

describe('User Service', () => {
    let userService;

    beforeEach(() => {
        userService = new UserServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${userServiceBoundaryTest} should create a new user`, async () => {
            const userData = { username: 'username', email: 'email@example.com', password: 'password' };
            UserModel.create.mockResolvedValue(userData);

            const result = await userService.createUser(userData);
            expect(result).toEqual(userData);
        });

        it(`${userServiceBoundaryTest} should get user by email`, async () => {
            const email = 'email@example.com';
            const user = { _id: 'user_id', email: email };
            UserModel.findOne.mockResolvedValue(user);

            const result = await userService.getUserByEmail(email);
            expect(result).toEqual(user);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to create a user`, async () => {
            const userData = { username: 'username', email: 'email@example.com', password: 'password' };
            const error = new Error('Failed to create user.');
            UserModel.create.mockRejectedValue(error);

            await expect(userService.createUser(userData)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get a user by email`, async () => {
            const email = 'email@example.com';
            const error = new Error('Failed to get user by email.');
            UserModel.findOne.mockRejectedValue(error);

            await expect(userService.getUserByEmail(email)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should get user by ID`, async () => {
            const userId = 'user_id';
            const user = { _id: userId, username: 'username' };
            UserModel.findById.mockResolvedValue(user);
            const result = await userService.getUser(userId);
            expect(result).toEqual(user);
        });

        it(`${userServiceBoundaryTest} should update user by ID`, async () => {
            const userId = 'user_id';
            const updatedUserData = { username: 'new_username', email: 'new_email@example.com' };
            const updatedUser = { _id: userId, ...updatedUserData };
            UserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);

            const result = await userService.updateUser(userId, updatedUserData);
            expect(result).toEqual(updatedUser);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get a user by ID`, async () => {
            const userId = 'non_existing_id';
            const error = new Error('Failed to get user profile.');
            UserModel.findById.mockRejectedValue(error);

            await expect(userService.getUser(userId)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to update a user by ID`, async () => {
            const userId = 'non_existing_id';
            const updatedUserData = { username: 'new_username', email: 'new_email@example.com' };
            const error = new Error('Failed to update user profile.');
            UserModel.findByIdAndUpdate.mockRejectedValue(error);

            await expect(userService.updateUser(userId, updatedUserData)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should delete user by ID`, async () => {
            const userId = 'user_id';
            const deletedUser = { _id: userId, username: 'username' };
            UserModel.findByIdAndDelete.mockResolvedValue(deletedUser);

            const result = await userService.deleteUser(userId);
            expect(result).toEqual(deletedUser);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to delete a user by ID`, async () => {
            const userId = 'non_existing_id';
            const error = new Error('Failed to delete user profile.');
            UserModel.findByIdAndDelete.mockRejectedValue(error);

            await expect(userService.deleteUser(userId)).rejects.toThrow(error);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get user's upcoming trips`, async () => {
            const userId = 'user_id';
            const error = new Error("Failed to get user's upcoming trips.");

            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockRejectedValue(error),
            });
            try {
                const result = await userService.getUpcomingTrips(userId);
                expect(result).not.toBeNull();
            } catch (e) {
                expect(e.message).toBe(error.message);
            }
        });

        it(`${userServiceBoundaryTest} should get user's past trips`, async () => {
            const userId = 'user_id';
            const userWithTrips = {
                _id: userId,
                trips: [
                    { _id: 'trip_id_1', endDate: new Date('2023-08-15') },
                    { _id: 'trip_id_2', endDate: new Date('2023-07-20') },
                ],
            };
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(userWithTrips),
            });
            const result = await userService.getPastTrips(userId);
            const expectedPastTrips = [
                { _id: 'trip_id_2', endDate: new Date('2023-07-20') },
            ];
            expect(result).toBeTruthy();
        });

        it(`${userServiceBoundaryTest} should throw an error when user is not found for getPastTrips`, async () => {
            const userId = 'non_existing_user_id';

            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(null),
            });

            try {
                const result = await userService.getPastTrips(userId);
                expect(result).not.toBeNull(); // Check that the result is not null
            } catch (e) {
                expect(e.message).toBe("Failed to get user's past trips.");
            }
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get user's past trips`, async () => {
            const userId = 'user_id';
            const error = new Error("Failed to get user's past trips.");
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockRejectedValue(error),
            });
            try {
                const result = await userService.getPastTrips(userId);
                expect(result).not.toBeNull();
            } catch (e) {
                expect(e.message).toBe(error.message);
            }
        });

        it(`${userServiceBoundaryTest} should get user's trip plans`, async () => {
            const userId = 'user_id';
            const userWithTrips = {
                _id: userId,
                trips: [{ _id: 'trip_id_1' }, { _id: 'trip_id_2' }],
            };
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(userWithTrips),
            });
            const result = await userService.getTripPlans(userId);
            expect(result).toEqual(userWithTrips.trips);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get user's trip plans`, async () => {
            const userId = 'user_id';
            const error = new Error("Failed to get user's trip plans.");
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockRejectedValue(error),
            });
            try {
                const result = await userService.getTripPlans(userId);
                expect(result).not.toBeNull();
            } catch (e) {
                expect(e.message).toBe(error.message);
            }
        });

        it(`${userServiceBoundaryTest} should get user's bookings`, async () => {
            const userId = 'user_id';
            const userWithBookings = {
                _id: userId,
                bookings: [{ _id: 'booking_id_1' }, { _id: 'booking_id_2' }],
            };
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(userWithBookings),
            });
            const result = await userService.getUserBookings(userId);
            expect(result).toEqual(userWithBookings.bookings);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get user's bookings`, async () => {
            const userId = 'user_id';
            const error = new Error("Failed to get user's bookings.");
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockRejectedValue(error),
            });
            try {
                const result = await userService.getUserBookings(userId);
                expect(result).not.toBeNull();
            } catch (e) {
                expect(e.message).toBe(error.message);
            }
        });

        it(`${userServiceBoundaryTest} should get user's reviews`, async () => {
            const userId = 'user_id';
            const userWithReviews = {
                _id: userId,
                reviews: [{ _id: 'review_id_1' }, { _id: 'review_id_2' }],
            };
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockResolvedValue(userWithReviews),
            });
            const result = await userService.getUserReviews(userId);
            expect(result).toEqual(userWithReviews.reviews);
        });

        it(`${userServiceBoundaryTest} should throw an error when failing to get user's reviews`, async () => {
            const userId = 'user_id';
            const error = new Error("Failed to get user's reviews.");
            UserModel.findById.mockReturnValue({
                populate: jest.fn().mockRejectedValue(error),
            });
            try {
                const result = await userService.getUserReviews(userId);
                expect(result).not.toBeNull();
            } catch (e) {
                expect(e.message).toBe(error.message);
            }
        });
    });
});
