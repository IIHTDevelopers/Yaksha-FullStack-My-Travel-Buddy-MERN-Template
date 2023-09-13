const express = require('express');
const DestinationController = require('../../modules/destination/controller/destination.controller');
const DestinationServiceImpl = require('../../modules/destination/service/impl/destination.serviceImpl');

jest.mock('../../modules/destination/service/impl/destination.serviceImpl');

const app = express();
app.use(express.json());

let destinationControllerBoundaryTest = `Destination boundary test`;
describe('Destination Controller', () => {
    describe('boundary', () => {
        it(`${destinationControllerBoundaryTest} should create a new destination`, async () => {
            const mReq = {
                body: {
                    name: 'New Destination',
                    category: 'Adventure',
                    budget: 1000,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockDestination = {
                _id: 'mockDestinationId',
                ...mReq.body,
            };
            DestinationServiceImpl.prototype.createDestination.mockResolvedValueOnce(mockDestination);
            await new DestinationController().createDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.createDestination).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockDestination);
        });

        it(`${destinationControllerBoundaryTest} should return a 400 error when missing name in createDestination`, async () => {
            const mReq = {
                body: {
                    category: 'Adventure',
                    budget: 1000,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            await new DestinationController().createDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.createDestination).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Name is required.' });
        });

        it(`${destinationControllerBoundaryTest} should get a destination by ID`, async () => {
            const mockDestinationId = 'mockDestinationId';
            const mReq = {
                params: {
                    destinationId: mockDestinationId,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockDestination = {
                _id: mockDestinationId,
                name: 'Test Destination',
                category: 'Adventure',
                budget: 1500,
            };
            DestinationServiceImpl.prototype.getDestination.mockResolvedValueOnce(mockDestination);
            await new DestinationController().getDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.getDestination).toHaveBeenCalledWith(mockDestinationId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockDestination);
        });

        it(`${destinationControllerBoundaryTest} should return a 404 error when getDestination fails`, async () => {
            const mockDestinationId = 'mockDestinationId';
            const mReq = {
                params: {
                    destinationId: mockDestinationId,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Destination not found.');
            DestinationServiceImpl.prototype.getDestination.mockRejectedValueOnce(error);
            await new DestinationController().getDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.getDestination).toHaveBeenCalledWith(mockDestinationId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Destination not found.' });
        });

        it(`${destinationControllerBoundaryTest} should update a destination`, async () => {
            const mockDestinationId = 'mockDestinationId';
            const mReq = {
                params: {
                    destinationId: mockDestinationId,
                },
                body: {
                    name: 'Updated Destination',
                    category: 'Nature',
                    budget: 1200,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockUpdatedDestination = {
                _id: mockDestinationId,
                ...mReq.body,
            };
            DestinationServiceImpl.prototype.updateDestination.mockResolvedValueOnce(mockUpdatedDestination);
            await new DestinationController().updateDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.updateDestination).toHaveBeenCalledWith(mockDestinationId, expect.objectContaining(mReq.body));
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockUpdatedDestination);
        });

        it(`${destinationControllerBoundaryTest} should return a 404 error when updateDestination fails`, async () => {
            const mockDestinationId = 'mockDestinationId';
            const mReq = {
                params: {
                    destinationId: mockDestinationId,
                },
                body: {
                    name: 'Updated Destination',
                    category: 'Nature',
                    budget: 1200,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Destination not found.');
            DestinationServiceImpl.prototype.updateDestination.mockRejectedValueOnce(error);
            await new DestinationController().updateDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.updateDestination).toHaveBeenCalledWith(mockDestinationId, expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Destination not found.' });
        });

        it(`${destinationControllerBoundaryTest} should delete a destination`, async () => {
            const mockDestinationId = 'mockDestinationId';
            const mReq = {
                params: {
                    destinationId: mockDestinationId,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockDeletedDestination = {
                _id: mockDestinationId,
                name: 'Deleted Destination',
                category: 'Adventure',
                budget: 1800,
            };
            DestinationServiceImpl.prototype.deleteDestination.mockResolvedValueOnce(mockDeletedDestination);
            await new DestinationController().deleteDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.deleteDestination).toHaveBeenCalledWith(mockDestinationId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockDeletedDestination);
        });

        it(`${destinationControllerBoundaryTest} should return a 404 error when deleteDestination fails`, async () => {
            const mockDestinationId = 'mockDestinationId';
            const mReq = {
                params: {
                    destinationId: mockDestinationId,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Destination not found.');
            DestinationServiceImpl.prototype.deleteDestination.mockRejectedValueOnce(error);
            await new DestinationController().deleteDestination(mReq, mRes);
            expect(DestinationServiceImpl.prototype.deleteDestination).toHaveBeenCalledWith(mockDestinationId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Destination not found.' });
        });

        it(`${destinationControllerBoundaryTest} should search destinations by name`, async () => {
            const mReq = {
                query: {
                    name: 'SearchQuery',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockSearchResults = [
                {
                    _id: 'destination1',
                    name: 'Search Result 1',
                    category: 'Nature',
                    budget: 1000,
                },
                {
                    _id: 'destination2',
                    name: 'Search Result 2',
                    category: 'Adventure',
                    budget: 1200,
                },
            ];
            DestinationServiceImpl.prototype.searchDestinationsByName.mockResolvedValueOnce(mockSearchResults);
            await new DestinationController().searchDestinations(mReq, mRes);
            expect(DestinationServiceImpl.prototype.searchDestinationsByName).toHaveBeenCalledWith('SearchQuery');
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockSearchResults);
        });

        it(`${destinationControllerBoundaryTest} should search destinations by category`, async () => {
            const mReq = {
                query: {
                    category: 'Nature',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockSearchResults = [
                {
                    _id: 'destination1',
                    name: 'Nature Destination 1',
                    category: 'Nature',
                    budget: 1000,
                },
                {
                    _id: 'destination2',
                    name: 'Nature Destination 2',
                    category: 'Nature',
                    budget: 1200,
                },
            ];
            DestinationServiceImpl.prototype.searchDestinationsByCategory.mockResolvedValueOnce(mockSearchResults);
            await new DestinationController().searchDestinations(mReq, mRes);
            expect(DestinationServiceImpl.prototype.searchDestinationsByCategory).toHaveBeenCalledWith('Nature');
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockSearchResults);
        });

        it(`${destinationControllerBoundaryTest} should search destinations by budget range`, async () => {
            const mReq = {
                query: {
                    min: 800,
                    max: 1200,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockSearchResults = [
                {
                    _id: 'destination1',
                    name: 'Budget Destination 1',
                    category: 'Nature',
                    budget: 1000,
                },
                {
                    _id: 'destination2',
                    name: 'Budget Destination 2',
                    category: 'Adventure',
                    budget: 1200,
                },
            ];
            DestinationServiceImpl.prototype.searchDestinationsByBudgetRange.mockResolvedValueOnce(mockSearchResults);
            await new DestinationController().searchDestinationsByBudgetRange(mReq, mRes);
            expect(DestinationServiceImpl.prototype.searchDestinationsByBudgetRange).toHaveBeenCalledWith(800, 1200);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockSearchResults);
        });

        it(`${destinationControllerBoundaryTest} should get all destinations`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockDestinations = [
                {
                    _id: 'destination1',
                    name: 'Destination 1',
                    category: 'Nature',
                    budget: 1000,
                },
                {
                    _id: 'destination2',
                    name: 'Destination 2',
                    category: 'Adventure',
                    budget: 1200,
                },
            ];
            DestinationServiceImpl.prototype.getAllDestinations.mockResolvedValueOnce(mockDestinations);
            await new DestinationController().getAllDestinations(mReq, mRes);
            expect(DestinationServiceImpl.prototype.getAllDestinations).toHaveBeenCalled();
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockDestinations);
        });

        it(`${destinationControllerBoundaryTest} should return a 500 error when searchDestinationsByName fails`, async () => {
            const mReq = {
                query: {
                    name: 'SearchQuery',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search destinations by name.');
            DestinationServiceImpl.prototype.searchDestinationsByName.mockRejectedValueOnce(error);
            await new DestinationController().searchDestinations(mReq, mRes);
            expect(DestinationServiceImpl.prototype.searchDestinationsByName).toHaveBeenCalledWith('SearchQuery');
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search destinations by name.' });
        });

        it(`${destinationControllerBoundaryTest} should return a 500 error when searchDestinationsByCategory fails`, async () => {
            const mReq = {
                query: {
                    category: 'Nature',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search destinations by category.');
            DestinationServiceImpl.prototype.searchDestinationsByCategory.mockRejectedValueOnce(error);
            await new DestinationController().searchDestinations(mReq, mRes);
            expect(DestinationServiceImpl.prototype.searchDestinationsByCategory).toHaveBeenCalledWith('Nature');
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search destinations by category.' });
        });

        it(`${destinationControllerBoundaryTest} should return a 500 error when searchDestinationsByBudgetRange fails`, async () => {
            const mReq = {
                query: {
                    min: 800,
                    max: 1200,
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to search destinations by budget range.');
            DestinationServiceImpl.prototype.searchDestinationsByBudgetRange.mockRejectedValueOnce(error);
            await new DestinationController().searchDestinationsByBudgetRange(mReq, mRes);
            expect(DestinationServiceImpl.prototype.searchDestinationsByBudgetRange).toHaveBeenCalledWith(800, 1200);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search destinations by budget range.' });
        });

        it(`${destinationControllerBoundaryTest} should return a 500 error when getAllDestinations fails`, async () => {
            const mReq = {};
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to get all destinations.');
            DestinationServiceImpl.prototype.getAllDestinations.mockRejectedValueOnce(error);
            await new DestinationController().getAllDestinations(mReq, mRes);
            expect(DestinationServiceImpl.prototype.getAllDestinations).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get all destinations.' });
        });

        it(`${destinationControllerBoundaryTest} should get top-rated destinations`, async () => {
            const mRes = {
                json: jest.fn(),
            };
            const mockTopRatedDestinations = [
                {
                    _id: 'destination1',
                    name: 'Top Destination 1',
                    rating: 4.8,
                },
                {
                    _id: 'destination2',
                    name: 'Top Destination 2',
                    rating: 4.9,
                },
            ];
            DestinationServiceImpl.prototype.getTopRatedDestinations.mockResolvedValueOnce(mockTopRatedDestinations);
            await new DestinationController().getTopRatedDestinations({}, mRes);
            expect(DestinationServiceImpl.prototype.getTopRatedDestinations).toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockTopRatedDestinations);
        });

        it(`${destinationControllerBoundaryTest} should return a 500 error when getTopRatedDestinations fails`, async () => {
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const error = new Error('Failed to get top-rated destinations');
            DestinationServiceImpl.prototype.getTopRatedDestinations.mockRejectedValueOnce(error);
            await new DestinationController().getTopRatedDestinations({}, mRes);
            expect(DestinationServiceImpl.prototype.getTopRatedDestinations).toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get top-rated destinations.' });
        });
    });
});
