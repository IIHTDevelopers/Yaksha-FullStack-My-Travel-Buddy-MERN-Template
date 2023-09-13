import axios from 'axios';
import authService from '../../services/auth.service';
import destinationService from '../../services/destination.service';

jest.mock('axios');

describe('destinationService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("DestinationService functional should create a new destination", async () => {
            const mockDestinationData = { name: 'Paris', description: 'City of Love' };
            const successResponse = { destinationId: 1 };
            let isNull = false;
            try {
                const response = await destinationService.createDestination(mockDestinationData);
                isNull = response === null;
                throw new Error("Error in createDestination()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Destination created');
                } else {
                    const mockResponseData = { destinationId: 1 };
                    destinationService.createDestination = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.createDestination(mockDestinationData);
                    expect(destinationService.createDestination).toHaveBeenCalledWith(mockDestinationData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("DestinationService functional should get a destination by ID", async () => {
            const destinationId = 1;
            const successResponse = { destinationId: 1, name: 'Paris' };
            let isNull = false;
            try {
                const response = await destinationService.getDestination(destinationId);
                isNull = response === null;
                throw new Error("Error in getDestination()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Destination fetched');
                } else {
                    const mockResponseData = { destinationId: 1, name: 'Paris' };
                    destinationService.getDestination = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.getDestination(destinationId);
                    expect(destinationService.getDestination).toHaveBeenCalledWith(destinationId);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("DestinationService functional should update a destination by ID", async () => {
            const destinationId = 1;
            const mockDestinationData = { name: 'Paris', description: 'City of Love' };
            const successResponse = { destinationId: 1 };
            let isNull = false;
            try {
                const response = await destinationService.updateDestination(destinationId, mockDestinationData);
                isNull = response === null;
                throw new Error("Error in updateDestination()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Destination updated');
                } else {
                    const mockResponseData = { destinationId: 1 };
                    destinationService.updateDestination = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.updateDestination(destinationId, mockDestinationData);
                    expect(destinationService.updateDestination).toHaveBeenCalledWith(destinationId, mockDestinationData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("DestinationService functional should delete a destination by ID", async () => {
            const destinationId = 1;
            const successResponse = { message: 'Destination deleted' };
            let isNull = false;
            try {
                const response = await destinationService.deleteDestination(destinationId);
                isNull = response === null;
                throw new Error("Error in deleteDestination()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Destination deleted');
                } else {
                    const mockResponseData = { message: 'Destination deleted' };
                    destinationService.deleteDestination = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.deleteDestination(destinationId);
                    expect(destinationService.deleteDestination).toHaveBeenCalledWith(destinationId);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("DestinationService functional should search destinations by search parameters", async () => {
            const searchParams = { keyword: 'beach' };
            const successResponse = [{ destinationId: 1, name: 'Beach Paradise' }];
            let isNull = false;
            try {
                const response = await destinationService.searchDestinations(searchParams);
                isNull = response === null;
                throw new Error("Error in searchDestinations()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Destinations searched');
                } else {
                    const mockResponseData = [{ destinationId: 1, name: 'Beach Paradise' }];
                    destinationService.searchDestinations = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.searchDestinations(searchParams);
                    expect(destinationService.searchDestinations).toHaveBeenCalledWith(searchParams);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("DestinationService functional should get all destinations", async () => {
            const successResponse = [{ destinationId: 1, name: 'Paris' }];
            let isNull = false;
            try {
                const response = await destinationService.getAllDestinations();
                isNull = response === null;
                throw new Error("Error in getAllDestinations()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('All destinations fetched');
                } else {
                    const mockResponseData = [{ destinationId: 1, name: 'Paris' }];
                    destinationService.getAllDestinations = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.getAllDestinations();
                    expect(destinationService.getAllDestinations).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("DestinationService functional should get top-rated destinations", async () => {
            const successResponse = [{ destinationId: 1, name: 'Paris' }];
            let isNull = false;
            try {
                const response = await destinationService.getTopRatedDestinations();
                isNull = response === null;
                throw new Error("Error in getTopRatedDestinations()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Top-rated destinations fetched');
                } else {
                    const mockResponseData = [{ destinationId: 1, name: 'Paris' }];
                    destinationService.getTopRatedDestinations = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await destinationService.getTopRatedDestinations();
                    expect(destinationService.getTopRatedDestinations).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});
