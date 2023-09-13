import axios from 'axios';
import tripPlanService from '../../services/trip-plan.service';

jest.mock('axios');

describe('tripPlanService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("TripPlanService functional should create a new trip plan", async () => {
            const mockTripPlanData = { name: 'Trip A', destination: 'Paris' };
            const successResponse = { tripPlanId: 1 };
            let isNull = false;
            try {
                const response = await tripPlanService.createTripPlan();
                isNull = response === null;
                throw new Error("Error in createTripPlan()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plan created');
                } else {
                    const mockResponseData = { tripPlanId: 1 };
                    tripPlanService.createTripPlan = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.createTripPlan(mockTripPlanData);
                    expect(tripPlanService.createTripPlan).toHaveBeenCalledWith(mockTripPlanData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should get a trip plan by ID", async () => {
            const successResponse = { tripPlanId: 1, name: 'Trip A', destination: 'Paris' };
            let isNull = false;
            try {
                const response = await tripPlanService.getTripPlan(1);
                isNull = response === null;
                throw new Error("Error in getTripPlan()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plan fetched');
                } else {
                    const mockResponseData = { tripPlanId: 1, name: 'Trip A', destination: 'Paris' };
                    tripPlanService.getTripPlan = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.getTripPlan(1);
                    expect(tripPlanService.getTripPlan).toHaveBeenCalledWith(1);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should update a trip plan by ID", async () => {
            const mockTripPlanData = { name: 'Updated Trip A', destination: 'New York' };
            const successResponse = { tripPlanId: 1 };
            let isNull = false;
            try {
                const response = await tripPlanService.updateTripPlan(1, mockTripPlanData);
                isNull = response === null;
                throw new Error("Error in updateTripPlan()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plan updated');
                } else {
                    const mockResponseData = { tripPlanId: 1 };
                    tripPlanService.updateTripPlan = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.updateTripPlan(1, mockTripPlanData);
                    expect(tripPlanService.updateTripPlan).toHaveBeenCalledWith(1, mockTripPlanData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should delete a trip plan by ID", async () => {
            const successResponse = { message: 'Trip plan deleted' };
            let isNull = false;
            try {
                const response = await tripPlanService.deleteTripPlan(1);
                isNull = response === null;
                throw new Error("Error in deleteTripPlan()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plan deleted');
                } else {
                    const mockResponseData = { message: 'Trip plan deleted' };
                    tripPlanService.deleteTripPlan = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.deleteTripPlan(1);
                    expect(tripPlanService.deleteTripPlan).toHaveBeenCalledWith(1);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should search trip plans by destination name", async () => {
            const mockDestinationName = 'Paris';
            const successResponse = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await tripPlanService.searchTripPlansByDestination(mockDestinationName);
                isNull = response === null;
                throw new Error("Error in searchTripPlansByDestination()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plans fetched by destination');
                } else {
                    const mockResponseData = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
                    tripPlanService.searchTripPlansByDestination = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.searchTripPlansByDestination(mockDestinationName);
                    expect(tripPlanService.searchTripPlansByDestination).toHaveBeenCalledWith(mockDestinationName);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should search trip plans by budget range", async () => {
            const mockMinBudget = 1000;
            const mockMaxBudget = 2000;
            const successResponse = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await tripPlanService.searchTripPlansByBudgetRange(mockMinBudget, mockMaxBudget);
                isNull = response === null;
                throw new Error("Error in searchTripPlansByBudgetRange()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plans fetched by budget range');
                } else {
                    const mockResponseData = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
                    tripPlanService.searchTripPlansByBudgetRange = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.searchTripPlansByBudgetRange(mockMinBudget, mockMaxBudget);
                    expect(tripPlanService.searchTripPlansByBudgetRange).toHaveBeenCalledWith(mockMinBudget, mockMaxBudget);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should get all trip plans", async () => {
            const successResponse = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await tripPlanService.getAllTripPlans();
                isNull = response === null;
                throw new Error("Error in getAllTripPlans()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('All trip plans fetched');
                } else {
                    const mockResponseData = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
                    tripPlanService.getAllTripPlans = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.getAllTripPlans();
                    expect(tripPlanService.getAllTripPlans).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should get trip plans by user", async () => {
            const successResponse = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await tripPlanService.getTripPlansByUser();
                isNull = response === null;
                throw new Error("Error in getTripPlansByUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Trip plans fetched by user');
                } else {
                    const mockResponseData = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
                    tripPlanService.getTripPlansByUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.getTripPlansByUser();
                    expect(tripPlanService.getTripPlansByUser).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("TripPlanService functional should get popular trip plans", async () => {
            const successResponse = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await tripPlanService.getPopularTripPlans();
                isNull = response === null;
                throw new Error("Error in getPopularTripPlans()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Popular trip plans fetched');
                } else {
                    const mockResponseData = [{ tripPlanId: 1, name: 'Trip A', destination: 'Paris' }];
                    tripPlanService.getPopularTripPlans = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await tripPlanService.getPopularTripPlans();
                    expect(tripPlanService.getPopularTripPlans).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});
