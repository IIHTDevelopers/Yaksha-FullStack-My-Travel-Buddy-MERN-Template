const DestinationServiceImpl = require('../../modules/destination/service/impl/destination.serviceImpl');
const DestinationModel = require('../../modules/destination/dao/models/destination.model');

jest.mock('../../modules/destination/dao/models/destination.model');

let destinationServiceBoundaryTest = 'DestinationService functional test';

describe('Destination Service', () => {
    let destinationService;

    beforeEach(() => {
        destinationService = new DestinationServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        it(`${destinationServiceBoundaryTest} should create a new destination`, async () => {
            const destinationData = {
                name: 'Destination Name',
                category: 'Category',
                budget: 1000,
            };
            DestinationModel.create.mockResolvedValue(destinationData);
            const result = await destinationService.createDestination(destinationData);
            expect(result).toEqual(destinationData);
        });

        it(`${destinationServiceBoundaryTest} should get destination by ID`, async () => {
            const destinationId = 'destination_id';
            const destination = { _id: destinationId, name: 'Destination Name' };
            DestinationModel.findById.mockResolvedValue(destination);
            const result = await destinationService.getDestination(destinationId);
            expect(result).toEqual(destination);
        });

        it(`${destinationServiceBoundaryTest} should update destination by ID`, async () => {
            const destinationId = 'destination_id';
            const updatedDestinationData = {
                name: 'Updated Destination',
                category: 'Updated Category',
                budget: 1500,
            };
            const updatedDestination = { _id: destinationId, ...updatedDestinationData };
            DestinationModel.findByIdAndUpdate.mockResolvedValue(updatedDestination);
            const result = await destinationService.updateDestination(destinationId, updatedDestinationData);
            expect(result).toEqual(updatedDestination);
        });

        it(`${destinationServiceBoundaryTest} should delete destination by ID`, async () => {
            const destinationId = 'destination_id';
            const deletedDestination = {
                _id: destinationId,
                name: 'Destination Name',
                category: 'Category',
                budget: 1000,
            };
            DestinationModel.findByIdAndDelete.mockResolvedValue(deletedDestination);
            const result = await destinationService.deleteDestination(destinationId);
            expect(result).toEqual(deletedDestination);
        });

        it(`${destinationServiceBoundaryTest} should search destinations by name`, async () => {
            const searchName = 'Search Query';
            const destinations = [
                { _id: 'destination_id_1', name: 'Destination A' },
                { _id: 'destination_id_2', name: 'Destination B' },
            ];
            DestinationModel.find.mockResolvedValue(destinations);
            const result = await destinationService.searchDestinationsByName(searchName);
            expect(result).toEqual(destinations);
        });

        it(`${destinationServiceBoundaryTest} should search destinations by category`, async () => {
            const searchCategory = 'Search Category';
            const destinations = [
                { _id: 'destination_id_1', category: 'Category A' },
                { _id: 'destination_id_2', category: 'Category B' },
            ];
            DestinationModel.find.mockResolvedValue(destinations);
            const result = await destinationService.searchDestinationsByCategory(searchCategory);
            expect(result).toEqual(destinations);
        });

        it(`${destinationServiceBoundaryTest} should search destinations by budget range`, async () => {
            const minBudget = 500;
            const maxBudget = 1500;
            const destinations = [
                { _id: 'destination_id_1', budget: 800 },
                { _id: 'destination_id_2', budget: 1200 },
            ];
            DestinationModel.find.mockResolvedValue(destinations);
            const result = await destinationService.searchDestinationsByBudgetRange(minBudget, maxBudget);
            expect(result).toEqual(destinations);
        });

        it(`${destinationServiceBoundaryTest} should get all destinations`, async () => {
            const destinations = [
                { _id: 'destination_id_1', name: 'Destination A' },
                { _id: 'destination_id_2', name: 'Destination B' },
            ];
            DestinationModel.find.mockResolvedValue(destinations);
            const result = await destinationService.getAllDestinations();
            expect(result).toEqual(destinations);
        });

        it(`${destinationServiceBoundaryTest} should get destinations by category`, async () => {
            const category = 'Category A';
            const destinations = [
                { _id: 'destination_id_1', category: 'Category A' },
                { _id: 'destination_id_2', category: 'Category A' },
            ];
            DestinationModel.find.mockResolvedValue(destinations);
            const result = await destinationService.getDestinationsByCategory(category);
            expect(result).toEqual(destinations);
        });

        it(`${destinationServiceBoundaryTest} should get top-rated destinations`, async () => {
            DestinationModel.aggregate.mockResolvedValue([
                { _id: 'destination_id_1', averageRating: 4.5 },
                { _id: 'destination_id_2', averageRating: 4.0 },
            ]);
            DestinationModel.find.mockResolvedValue([
                { _id: 'destination_id_1', name: 'Destination A' },
                { _id: 'destination_id_2', name: 'Destination B' },
            ]);
            const result = await destinationService.getTopRatedDestinations();
            expect(DestinationModel.aggregate).toHaveBeenCalledWith([
                {
                    $lookup: {
                        from: 'reviews',
                        localField: 'reviews',
                        foreignField: '_id',
                        as: 'reviewDetails',
                    },
                },
                {
                    $unwind: '$reviewDetails',
                },
                {
                    $group: {
                        _id: '$_id',
                        averageRating: { $avg: '$reviewDetails.rating' },
                    },
                },
                {
                    $match: {
                        averageRating: { $gte: 4 },
                    },
                },
            ]);
            expect(DestinationModel.find).toHaveBeenCalledWith({
                _id: { $in: ['destination_id_1', 'destination_id_2'] },
            });
            expect(result).toEqual([
                { _id: 'destination_id_1', name: 'Destination A' },
                { _id: 'destination_id_2', name: 'Destination B' },
            ]);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to create a destination`, async () => {
            const destinationData = {
                name: 'Destination Name',
                category: 'Category',
                budget: 1000,
            };
            const error = new Error('Failed to create destination.');
            DestinationModel.create.mockRejectedValue(error);
            await expect(destinationService.createDestination(destinationData)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to get destination by ID`, async () => {
            const destinationId = 'non_existing_id';
            const error = new Error('Failed to get destination.');
            DestinationModel.findById.mockRejectedValue(error);
            await expect(destinationService.getDestination(destinationId)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to update destination by ID`, async () => {
            const destinationId = 'non_existing_id';
            const updatedDestinationData = {
                name: 'Updated Destination',
                category: 'Updated Category',
                budget: 1500,
            };
            const error = new Error('Failed to update destination.');
            DestinationModel.findByIdAndUpdate.mockRejectedValue(error);
            await expect(destinationService.updateDestination(destinationId, updatedDestinationData)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to delete destination by ID`, async () => {
            const destinationId = 'non_existing_id';
            const error = new Error('Failed to delete destination.');
            DestinationModel.findByIdAndDelete.mockRejectedValue(error);
            await expect(destinationService.deleteDestination(destinationId)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to search destinations by name`, async () => {
            const searchName = 'Search Query';
            const error = new Error('Failed to search destinations by name.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(destinationService.searchDestinationsByName(searchName)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to search destinations by category`, async () => {
            const searchCategory = 'Search Category';
            const error = new Error('Failed to search destinations by category.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(destinationService.searchDestinationsByCategory(searchCategory)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to search destinations by budget range`, async () => {
            const minBudget = 500;
            const maxBudget = 1500;
            const error = new Error('Failed to search destinations by budget range.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(destinationService.searchDestinationsByBudgetRange(minBudget, maxBudget)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to get all destinations`, async () => {
            const error = new Error('Failed to get all destinations.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(destinationService.getAllDestinations()).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to get destinations by category`, async () => {
            const category = 'Category A';
            const error = new Error('Failed to get destinations by category.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(destinationService.getDestinationsByCategory(category)).rejects.toThrow(error);
        });

        it(`${destinationServiceBoundaryTest} should throw an error when failing to get top-rated destinations`, async () => {
            const error = new Error('Failed to get top-rated destinations.');
            DestinationModel.aggregate.mockRejectedValue(error);
            await expect(destinationService.getTopRatedDestinations()).rejects.toThrow(error);
            expect(DestinationModel.aggregate).toHaveBeenCalledWith([
                {
                    $lookup: {
                        from: 'reviews',
                        localField: 'reviews',
                        foreignField: '_id',
                        as: 'reviewDetails',
                    },
                },
                {
                    $unwind: '$reviewDetails',
                },
                {
                    $group: {
                        _id: '$_id',
                        averageRating: { $avg: '$reviewDetails.rating' },
                    },
                },
                {
                    $match: {
                        averageRating: { $gte: 4 },
                    },
                },
            ]);
        });
    });
});
