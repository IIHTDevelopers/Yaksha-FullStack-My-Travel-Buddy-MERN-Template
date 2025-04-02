const express = require('express');
const router = require('../../modules/trip-plan/routes/trip-plan.routes');

const TripPlanController = require('../../modules/trip-plan/controller/trip-plan.controller');
const TripPlanServiceImpl = require('../../modules/trip-plan/service/impl/trip-plan.serviceImpl');
const authGuard = require('../../modules/auth/middleware/auth.guard');

const app = express();
app.use(express.json());
app.use(authGuard);

app.use(router);

jest.mock('../../modules/trip-plan/service/impl/trip-plan.serviceImpl');

let tripPlanControllerBoundaryTest = `TripPlan boundary test`;
describe('TripPlan Controller', () => {
    describe('boundary', () => {
        it(`${tripPlanControllerBoundaryTest} should create a new trip plan`, async () => {
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
            const mockTripPlan = {
                _id: 'mockTripPlanId',
                ...mReq.body,
            };
            TripPlanServiceImpl.prototype.createTripPlan.mockResolvedValueOnce(mockTripPlan);
            await new TripPlanController().createTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.createTripPlan).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockTripPlan);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 400 error when required fields are missing`, async () => {
            const mReq = {
                body: {
                    user: 'userId',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await new TripPlanController().createTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.createTripPlan).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User and destination are required.' });
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when createTripPlan fails`, async () => {
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
            const error = new Error('Failed to create trip plan.');
            TripPlanServiceImpl.prototype.createTripPlan.mockRejectedValueOnce(error);
            await new TripPlanController().createTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.createTripPlan).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create trip plan.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get a trip plan by ID`, async () => {
            const mockTripPlanId = 'mockTripPlanId';
            const mReq = {
                params: {
                    tripPlanId: mockTripPlanId,
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mockTripPlan = {
                _id: mockTripPlanId,
                destination: 'New York',
            };
            TripPlanServiceImpl.prototype.getTripPlan.mockResolvedValueOnce(mockTripPlan);
            await new TripPlanController().getTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getTripPlan).toHaveBeenCalledWith(mockTripPlanId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockTripPlan);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 404 error when getTripPlan fails`, async () => {
            const mockTripPlanId = 'mockTripPlanId';
            const mReq = {
                params: {
                    tripPlanId: mockTripPlanId,
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const error = new Error('Trip plan not found.');
            TripPlanServiceImpl.prototype.getTripPlan.mockRejectedValueOnce(error);
            await new TripPlanController().getTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getTripPlan).toHaveBeenCalledWith(mockTripPlanId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Trip plan not found.' });
        });

        it(`${tripPlanControllerBoundaryTest} should update a trip plan`, async () => {
            const mockTripPlanId = 'mockTripPlanId';
            const mReq = {
                params: {
                    tripPlanId: mockTripPlanId,
                },
                body: {
                    destination: 'Updated Destination',
                },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockUpdatedTripPlan = {
                _id: mockTripPlanId,
                ...mReq.body,
            };
            TripPlanServiceImpl.prototype.updateTripPlan.mockResolvedValueOnce(mockUpdatedTripPlan);
            await new TripPlanController().updateTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.updateTripPlan).toHaveBeenCalledWith(
                mockTripPlanId,
                expect.objectContaining(mReq.body)
            );
            expect(mRes.json).toHaveBeenCalledWith(mockUpdatedTripPlan);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when updateTripPlan fails`, async () => {
            const mockTripPlanId = 'mockTripPlanId';
            const mReq = {
                params: {
                    tripPlanId: mockTripPlanId,
                },
                body: {
                    destination: 'Updated Destination',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const error = new Error('Failed to update trip plan details.');
            TripPlanServiceImpl.prototype.updateTripPlan.mockRejectedValueOnce(error);
            await new TripPlanController().updateTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.updateTripPlan).toHaveBeenCalledWith(
                mockTripPlanId,
                expect.objectContaining(mReq.body)
            );
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to update trip plan details.' });
        });

        it(`${tripPlanControllerBoundaryTest} should delete a trip plan`, async () => {
            const mockTripPlanId = 'mockTripPlanId';
            const mReq = {
                params: {
                    tripPlanId: mockTripPlanId,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockDeletedTripPlan = {
                _id: mockTripPlanId,
            };
            TripPlanServiceImpl.prototype.deleteTripPlan.mockResolvedValueOnce(mockDeletedTripPlan);
            await new TripPlanController().deleteTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.deleteTripPlan).toHaveBeenCalledWith(mockTripPlanId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockDeletedTripPlan);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 404 error when deleteTripPlan fails`, async () => {
            const mockTripPlanId = 'mockTripPlanId';
            const mReq = {
                params: {
                    tripPlanId: mockTripPlanId,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Trip plan not found.');
            TripPlanServiceImpl.prototype.deleteTripPlan.mockRejectedValueOnce(error);
            await new TripPlanController().deleteTripPlan(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.deleteTripPlan).toHaveBeenCalledWith(mockTripPlanId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Trip plan not found.' });
        });

        it(`${tripPlanControllerBoundaryTest} should search trip plans by destination`, async () => {
            const mReq = {
                query: {
                    destinationName: 'New York',
                },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockTripPlans = [
                {
                    _id: 'plan123',
                    destination: 'New York',
                    startDate: new Date('2023-09-15'),
                    endDate: new Date('2023-09-20'),
                },
                {
                    _id: 'plan456',
                    destination: 'Paris',
                    startDate: new Date('2023-10-01'),
                    endDate: new Date('2023-10-10'),
                },
            ];
            TripPlanServiceImpl.prototype.searchTripPlansByDestination.mockResolvedValueOnce(mockTripPlans);
            await new TripPlanController().searchTripPlansByDestination(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.searchTripPlansByDestination).toHaveBeenCalledWith(mReq.query.destinationName);
            expect(mRes.json).toHaveBeenCalledWith(mockTripPlans);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when searching by destination fails`, async () => {
            const mReq = {
                query: {
                    destinationName: 'New York',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search trip plans by destination.');
            TripPlanServiceImpl.prototype.searchTripPlansByDestination.mockRejectedValueOnce(error);
            await new TripPlanController().searchTripPlansByDestination(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.searchTripPlansByDestination).toHaveBeenCalledWith(mReq.query.destinationName);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search trip plans by destination.' });
        });

        it(`${tripPlanControllerBoundaryTest} should search trip plans by budget range`, async () => {
            const mReq = {
                query: {
                    min: '100',
                    max: '500',
                },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockTripPlans = [
                {
                    _id: 'plan123',
                    destination: 'New York',
                    startDate: new Date('2023-09-15'),
                    endDate: new Date('2023-09-20'),
                },
                {
                    _id: 'plan456',
                    destination: 'Paris',
                    startDate: new Date('2023-10-01'),
                    endDate: new Date('2023-10-10'),
                },
            ];
            TripPlanServiceImpl.prototype.searchTripPlansByBudgetRange.mockResolvedValueOnce(mockTripPlans);
            await new TripPlanController().searchTripPlansByDestination(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.searchTripPlansByBudgetRange).toHaveBeenCalledWith(
                parseFloat(mReq.query.min),
                parseFloat(mReq.query.max)
            );
            expect(mRes.json).toHaveBeenCalledWith(mockTripPlans);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when searching by budget range fails`, async () => {
            const mReq = {
                query: {
                    min: '100',
                    max: '500',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search trip plans by budget range.');
            TripPlanServiceImpl.prototype.searchTripPlansByBudgetRange.mockRejectedValueOnce(error);
            await new TripPlanController().searchTripPlansByDestination(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.searchTripPlansByBudgetRange).toHaveBeenCalledWith(
                parseFloat(mReq.query.min),
                parseFloat(mReq.query.max)
            );
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search trip plans by budget range.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get all trip plans`, async () => {
            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mockTripPlans = [
                {
                    _id: 'tripPlanId1',
                    destination: 'New York',
                },
                {
                    _id: 'tripPlanId2',
                    destination: 'Paris',
                },
            ];
            TripPlanServiceImpl.prototype.getAllTripPlans.mockResolvedValueOnce(mockTripPlans);
            await new TripPlanController().getAllTripPlans(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getAllTripPlans).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockTripPlans);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getAllTripPlans fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to get all trip plans.');
            TripPlanServiceImpl.prototype.getAllTripPlans.mockRejectedValueOnce(error);
            await new TripPlanController().getAllTripPlans(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getAllTripPlans).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get all trip plans.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get trip plans by user`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
            };
            const mockUserTripPlans = [
                {
                    _id: 'userTripPlanId1',
                    destination: 'New York',
                },
                {
                    _id: 'userTripPlanId2',
                    destination: 'Paris',
                },
            ];
            TripPlanServiceImpl.prototype.getTripPlansByUser.mockResolvedValueOnce(mockUserTripPlans);
            await new TripPlanController().getTripPlansByUser(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getTripPlansByUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockUserTripPlans);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getTripPlansByUser fails`, async () => {
            const mockUserId = 'mockUserId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to get trip plans by user.');
            TripPlanServiceImpl.prototype.getTripPlansByUser.mockRejectedValueOnce(error);
            await new TripPlanController().getTripPlansByUser(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getTripPlansByUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get trip plans by user.' });
        });

        it(`${tripPlanControllerBoundaryTest} should get popular trip plans`, async () => {
            const mReq = {};
            const mRes = {
                json: jest.fn(),
            };
            const mockPopularTripPlans = [
                {
                    _id: 'tripPlanId1',
                    destination: 'New York',
                },
                {
                    _id: 'tripPlanId2',
                    destination: 'Paris',
                },
            ];
            TripPlanServiceImpl.prototype.getPopularTripPlans.mockResolvedValueOnce(mockPopularTripPlans);
            await new TripPlanController().getPopularTripPlans(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getPopularTripPlans).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockPopularTripPlans);
        });

        it(`${tripPlanControllerBoundaryTest} should return a 500 error when getPopularTripPlans fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockError = new Error('Failed to get popular trip plans.');
            TripPlanServiceImpl.prototype.getPopularTripPlans.mockRejectedValueOnce(mockError);
            await new TripPlanController().getPopularTripPlans(mReq, mRes);
            expect(TripPlanServiceImpl.prototype.getPopularTripPlans).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get popular trip plans.' });
        });
    });
});
