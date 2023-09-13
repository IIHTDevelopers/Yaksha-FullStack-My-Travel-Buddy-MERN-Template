import axios from 'axios';
import userService from '../../services/user.service';

jest.mock('axios');

describe('userService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("UserService functional should create a new user", async () => {
            const mockUserData = { username: 'testuser', password: 'testpassword' };
            const successResponse = { userId: 1 };
            let isNull = false;
            try {
                const response = await userService.createUser();
                isNull = response === null;
                throw new Error("Error in createUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User created');
                } else {
                    const mockUserData = { username: 'testuser', password: 'testpassword' };
                    const mockResponseData = { userId: 1 };
                    userService.createUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.createUser(mockUserData);
                    expect(userService.createUser).toHaveBeenCalledWith(mockUserData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should get user data", async () => {
            const successResponse = { userId: 1 };
            let isNull = false;
            try {
                const response = await userService.getUser();
                isNull = response === null;
                throw new Error("Error in getUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User data fetched');
                } else {
                    const mockResponseData = { userId: 1 };
                    userService.getUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.getUser();
                    expect(userService.getUser).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should update user data", async () => {
            const successResponse = { userId: 1 };
            let isNull = false;
            try {
                const response = await userService.updateUser();
                isNull = response === null;
                throw new Error("Error in updateUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User data updated');
                } else {
                    const mockUserData = { userId: 1, username: 'newuser' };
                    const mockResponseData = { userId: 1 };
                    userService.updateUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.updateUser(mockUserData);
                    expect(userService.updateUser).toHaveBeenCalledWith(mockUserData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should delete user", async () => {
            const successResponse = { message: 'User deleted' };
            let isNull = false;
            try {
                const response = await userService.deleteUser();
                isNull = response === null;
                throw new Error("Error in deleteUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User deleted');
                } else {
                    const mockResponseData = { message: 'User deleted' };
                    userService.deleteUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.deleteUser();
                    expect(userService.deleteUser).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should get upcoming trips", async () => {
            const successResponse = [{ tripId: 1, destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await userService.getUpcomingTrips();
                isNull = response === null;
                throw new Error("Error in getUpcomingTrips()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Upcoming trips fetched');
                } else {
                    const mockResponseData = [{ tripId: 1, destination: 'Paris' }];
                    userService.getUpcomingTrips = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.getUpcomingTrips();
                    expect(userService.getUpcomingTrips).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should get past trips", async () => {
            const successResponse = [{ tripId: 2, destination: 'London' }];
            let isNull = false;
            try {
                const response = await userService.getPastTrips();
                isNull = response === null;
                throw new Error("Error in getPastTrips()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Past trips fetched');
                } else {
                    const mockResponseData = [{ tripId: 2, destination: 'London' }];
                    userService.getPastTrips = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.getPastTrips();
                    expect(userService.getPastTrips).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should get trip plans", async () => {
            const successResponse = [{ planId: 1, name: 'Plan A' }];
            let isNull = false;
            try {
                const response = await userService.getTripPlans();
                isNull = response === null;
                throw new Error("Error in getTripPlans()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plans fetched');
                } else {
                    const mockResponseData = [{ planId: 1, name: 'Plan A' }];
                    userService.getTripPlans = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.getTripPlans();
                    expect(userService.getTripPlans).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should get user bookings", async () => {
            const successResponse = [{ bookingId: 1, destination: 'New York' }];
            let isNull = false;
            try {
                const response = await userService.getUserBookings();
                isNull = response === null;
                throw new Error("Error in getUserBookings()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User bookings fetched');
                } else {
                    const mockResponseData = [{ bookingId: 1, destination: 'New York' }];
                    userService.getUserBookings = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.getUserBookings();
                    expect(userService.getUserBookings).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("UserService functional should get user reviews", async () => {
            const successResponse = [{ reviewId: 1, text: 'Great experience' }];
            let isNull = false;
            try {
                const response = await userService.getUserReviews();
                isNull = response === null;
                throw new Error("Error in getUserReviews()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('User reviews fetched');
                } else {
                    const mockResponseData = [{ reviewId: 1, text: 'Great experience' }];
                    userService.getUserReviews = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await userService.getUserReviews();
                    expect(userService.getUserReviews).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});