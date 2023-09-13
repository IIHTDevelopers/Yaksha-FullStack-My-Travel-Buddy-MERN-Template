const DestinationModel = require("../../modules/destination/dao/models/destination.model");
const TripPlanModel = require("../../modules/trip-plan/dao/models/trip-plan.model");
const UserModel = require("../../modules/user/dao/models/user.model");
const TripPlanServiceImpl = require("../../modules/trip-plan/service/impl/trip-plan.serviceImpl");

jest.mock("../../modules/destination/dao/models/destination.model");
jest.mock("../../modules/trip-plan/dao/models/trip-plan.model");
jest.mock("../../modules/user/dao/models/user.model");

let tripPlanServiceBoundaryTest = `TripPlanService functional test`;

describe('TripPlan Service', () => {
    let tripPlanService;

    beforeEach(() => {
        tripPlanService = new TripPlanServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${tripPlanServiceBoundaryTest} should create a new trip plan`, async () => {
            const tripPlanData = { user: 'user_id', destination: 'destination_id', budget: 100 };
            const createdTripPlan = { ...tripPlanData, _id: 'trip_plan_id' };
            const updatedUser = { _id: 'user_id', trips: ['trip_plan_id'] };
            TripPlanModel.create.mockResolvedValue(createdTripPlan);
            UserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);
            const result = await tripPlanService.createTripPlan(tripPlanData);
            expect(result).toEqual(createdTripPlan);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to create a trip plan`, async () => {
            const tripPlanData = { user: 'user_id', destination: 'destination_id', budget: 100 };
            const error = new Error('Failed to create trip plan.');
            TripPlanModel.create.mockRejectedValue(error);
            await expect(tripPlanService.createTripPlan(tripPlanData)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should get trip plan by ID`, async () => {
            const tripPlanId = 'trip_plan_id';
            const tripPlan = { _id: tripPlanId };
            TripPlanModel.findById.mockResolvedValue(tripPlan);
            const result = await tripPlanService.getTripPlan(tripPlanId);
            expect(result).toEqual(tripPlan);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when trip plan is not found for getTripPlan`, async () => {
            const tripPlanId = 'non_existing_trip_plan_id';
            TripPlanModel.findById.mockResolvedValue(null);
            await expect(tripPlanService.getTripPlan(tripPlanId)).rejects.toThrow('Failed to get trip plan details.');
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to get trip plan details`, async () => {
            const tripPlanId = 'trip_plan_id';
            const error = new Error('Failed to get trip plan details.');
            TripPlanModel.findById.mockRejectedValue(error);
            await expect(tripPlanService.getTripPlan(tripPlanId)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should update trip plan by ID`, async () => {
            const tripPlanId = 'trip_plan_id';
            const updatedTripPlanData = { budget: 150 };
            const updatedTripPlan = { ...updatedTripPlanData, _id: tripPlanId };
            TripPlanModel.findByIdAndUpdate.mockResolvedValue(updatedTripPlan);
            const result = await tripPlanService.updateTripPlan(tripPlanId, updatedTripPlanData);
            expect(result).toEqual(updatedTripPlan);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when trip plan is not found for updateTripPlan`, async () => {
            const tripPlanId = 'non_existing_trip_plan_id';
            const updatedTripPlanData = { budget: 150 };
            TripPlanModel.findByIdAndUpdate.mockResolvedValue(null);
            await expect(tripPlanService.updateTripPlan(tripPlanId, updatedTripPlanData)).rejects.toThrow('Failed to update trip plan details.');
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to update trip plan details`, async () => {
            const tripPlanId = 'trip_plan_id';
            const updatedTripPlanData = { budget: 150 };
            const error = new Error('Failed to update trip plan details.');
            TripPlanModel.findByIdAndUpdate.mockRejectedValue(error);
            await expect(tripPlanService.updateTripPlan(tripPlanId, updatedTripPlanData)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should delete trip plan by ID`, async () => {
            const tripPlanId = 'trip_plan_id';
            const deletedTripPlan = { _id: tripPlanId, user: 'user_id' };
            const updatedUser = { _id: 'user_id', trips: [] };
            TripPlanModel.findByIdAndDelete.mockResolvedValue(deletedTripPlan);
            UserModel.findByIdAndUpdate.mockResolvedValue(updatedUser);
            const result = await tripPlanService.deleteTripPlan(tripPlanId);
            expect(result).toEqual(deletedTripPlan);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when trip plan is not found for deleteTripPlan`, async () => {
            const tripPlanId = 'non_existing_trip_plan_id';
            TripPlanModel.findByIdAndDelete.mockResolvedValue(null);
            await expect(tripPlanService.deleteTripPlan(tripPlanId)).rejects.toThrow('Failed to delete trip plan.');
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to delete trip plan`, async () => {
            const tripPlanId = 'trip_plan_id';
            const error = new Error('Failed to delete trip plan.');
            TripPlanModel.findByIdAndDelete.mockRejectedValue(error);
            await expect(tripPlanService.deleteTripPlan(tripPlanId)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should search trip plans by destination`, async () => {
            const destinationName = 'destination';
            const destination = { _id: 'destination_id' };
            const tripPlan = { _id: 'trip_plan_id', destination: 'destination_id' };
            const findMock = jest.fn().mockResolvedValue([destination]);
            DestinationModel.find = findMock;
            TripPlanModel.find.mockResolvedValue([tripPlan]);
            const result = await tripPlanService.searchTripPlansByDestination(destinationName);
            expect(result).toEqual([tripPlan]);
            expect(findMock).toHaveBeenCalledWith({ name: new RegExp(destinationName, 'i') });
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when no destinations found for searchTripPlansByDestination`, async () => {
            const destinationName = 'non_existing_destination';
            DestinationModel.find.mockResolvedValue([]);
            await expect(tripPlanService.searchTripPlansByDestination(destinationName)).rejects.toThrow('Failed to search trip plans by destination.');
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to search trip plans by destination`, async () => {
            const destinationName = 'destination';
            const error = new Error('Failed to search trip plans by destination.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(tripPlanService.searchTripPlansByDestination(destinationName)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should search trip plans by budget range`, async () => {
            const minBudget = 100;
            const maxBudget = 200;
            const tripPlan = { _id: 'trip_plan_id', budget: 150 };
            TripPlanModel.find.mockResolvedValue([tripPlan]);
            const result = await tripPlanService.searchTripPlansByBudgetRange(minBudget, maxBudget);
            expect(result).toEqual([tripPlan]);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to search trip plans by budget range`, async () => {
            const minBudget = 100;
            const maxBudget = 200;
            const error = new Error('Failed to search trip plans by budget range.');
            TripPlanModel.find.mockRejectedValue(error);
            await expect(tripPlanService.searchTripPlansByBudgetRange(minBudget, maxBudget)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should get all trip plans`, async () => {
            const tripPlan1 = { _id: 'trip_plan_id1' };
            const tripPlan2 = { _id: 'trip_plan_id2' };
            TripPlanModel.find.mockResolvedValue([tripPlan1, tripPlan2]);
            const result = await tripPlanService.getAllTripPlans();
            expect(result).toEqual([tripPlan1, tripPlan2]);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to get all trip plans`, async () => {
            const error = new Error('Failed to get all trip plans.');
            TripPlanModel.find.mockRejectedValue(error);
            await expect(tripPlanService.getAllTripPlans()).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should get trip plans by user ID`, async () => {
            const userId = 'user_id';
            const tripPlan1 = { _id: 'trip_plan_id1', user: userId };
            const tripPlan2 = { _id: 'trip_plan_id2', user: userId };
            TripPlanModel.find.mockResolvedValue([tripPlan1, tripPlan2]);
            const result = await tripPlanService.getTripPlansByUser(userId);
            expect(result).toEqual([tripPlan1, tripPlan2]);
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to get trip plans by user`, async () => {
            const userId = 'user_id';
            const error = new Error('Failed to get trip plans by user.');
            TripPlanModel.find.mockRejectedValue(error);
            await expect(tripPlanService.getTripPlansByUser(userId)).rejects.toThrow(error);
        });

        it(`${tripPlanServiceBoundaryTest} should get popular trip plans`, async () => {
            const tripPlan1 = { _id: 'trip_plan_id1', bookings: [{}] };
            const tripPlan2 = { _id: 'trip_plan_id2', bookings: [{}, {}] };
            const aggregateMock = jest.fn().mockResolvedValue([tripPlan1, tripPlan2]);
            TripPlanModel.aggregate = aggregateMock;
            const result = await tripPlanService.getPopularTripPlans();
            expect(result).toEqual([tripPlan1, tripPlan2]);
            expect(aggregateMock).toHaveBeenCalled();
        });

        it(`${tripPlanServiceBoundaryTest} should throw an error when failing to get popular trip plans`, async () => {
            const error = new Error('Failed to get popular trip plans.');
            TripPlanModel.aggregate.mockRejectedValue(error);
            await expect(tripPlanService.getPopularTripPlans()).rejects.toThrow(error);
        });
    });
});
