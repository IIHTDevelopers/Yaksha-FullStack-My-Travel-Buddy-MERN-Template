const ObjectId = require('mongoose').Types.ObjectId;
const UserModel = require("../../modules/user/dao/models/user.model");
const DestinationModel = require("../../modules/destination/dao/models/destination.model");
const BookingModel = require("../../modules/booking/dao/models/booking.model");
const BookingServiceImpl = require("../../modules/booking/service/impl/booking.serviceImpl");

jest.mock("../../modules/booking/dao/models/booking.model");
jest.mock("../../modules/user/dao/models/user.model");
jest.mock("../../modules/destination/dao/models/destination.model");

let bookingServiceBoundaryTest = "BookingService functional test";

describe("Booking Service", () => {
    let bookingService;

    beforeEach(() => {
        bookingService = new BookingServiceImpl();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("functional", () => {
        it(`${bookingServiceBoundaryTest} should create a new booking`, async () => {
            const bookingData = {
                user: 'user_id',
                destination: 'destination_id',
                startDate: new Date(),
                endDate: new Date(),
                status: 'Pending',
            };
            const createdBooking = { ...bookingData, _id: 'booking_id' };
            BookingModel.create.mockResolvedValue(createdBooking);
            const result = await bookingService.createBooking(bookingData);
            expect(result).toEqual(createdBooking);
        });

        it(`${bookingServiceBoundaryTest} should get booking by ID`, async () => {
            const bookingId = 'booking_id';
            const booking = { _id: bookingId, user: 'user_id' };
            BookingModel.findById.mockResolvedValue(booking);

            const result = await bookingService.getBooking(bookingId);
            expect(result).toEqual(booking);
        });

        it(`${bookingServiceBoundaryTest} should update booking by ID`, async () => {
            const bookingId = 'booking_id';
            const updatedBookingData = {
                user: 'updated_user_id',
                destination: 'updated_destination_id',
                startDate: new Date(),
                endDate: new Date(),
                status: 'Confirmed',
            };
            const updatedBooking = { _id: bookingId, ...updatedBookingData };
            BookingModel.findByIdAndUpdate.mockResolvedValue(updatedBooking);

            const result = await bookingService.updateBooking(bookingId, updatedBookingData);
            expect(result).toEqual(updatedBooking);
        });

        it(`${bookingServiceBoundaryTest} should delete booking by ID`, async () => {
            const bookingId = 'booking_id';
            const deletedBooking = {
                _id: bookingId,
                user: 'user_id',
                destination: 'destination_id',
                startDate: new Date(),
                endDate: new Date(),
                status: 'Pending',
            };
            BookingModel.findByIdAndDelete.mockResolvedValue(deletedBooking);
            const result = await bookingService.deleteBooking(bookingId);
            expect(result).toEqual(deletedBooking);
        });

        it(`${bookingServiceBoundaryTest} should search bookings by user`, async () => {
            const userId = 'user_id';
            const userBookings = [
                { _id: 'booking_id_1', user: userId },
                { _id: 'booking_id_2', user: userId },
            ];
            BookingModel.find.mockResolvedValue(userBookings);

            const result = await bookingService.searchBookingsByUser(userId);
            expect(result).toEqual(userBookings);
        });

        it(`${bookingServiceBoundaryTest} should search bookings by status`, async () => {
            const status = 'Pending';
            const bookingsByStatus = [
                { _id: 'booking_id_1', status },
                { _id: 'booking_id_2', status },
            ];
            BookingModel.find.mockResolvedValue(bookingsByStatus);

            const result = await bookingService.searchBookingsByStatus(status);
            expect(result).toEqual(bookingsByStatus);
        });

        it(`${bookingServiceBoundaryTest} should get bookings by destination name`, async () => {
            const destinationName = 'destination_name';
            const matchingDestinations = [
                { _id: 'destination_id_1' },
                { _id: 'destination_id_2' },
            ];
            const matchingDestinationIds = matchingDestinations.map(dest => dest._id.toString());
            const bookingsByDestination = [
                { _id: 'booking_id_1', destination: matchingDestinationIds[0] },
                { _id: 'booking_id_2', destination: matchingDestinationIds[1] },
            ];

            DestinationModel.find.mockResolvedValue(matchingDestinations);
            BookingModel.find.mockResolvedValue(bookingsByDestination);

            const result = await bookingService.getBookingsByDestination(destinationName);
            expect(result).toEqual(bookingsByDestination);
        });

        it(`${bookingServiceBoundaryTest} should get upcoming bookings for user`, async () => {
            const userId = 'user_id';
            const currentDate = new Date();
            const upcomingBookings = [
                { _id: 'booking_id_1', user: userId, startDate: currentDate },
                { _id: 'booking_id_2', user: userId, startDate: currentDate },
            ];
            BookingModel.find.mockResolvedValue(upcomingBookings);

            const result = await bookingService.getUpcomingBookingsForUser(userId);
            expect(result).toEqual(upcomingBookings);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to delete booking by ID`, async () => {
            const bookingId = 'booking_id';
            const error = new Error('Failed to delete booking.');
            BookingModel.findByIdAndDelete.mockRejectedValue(error);
            await expect(bookingService.deleteBooking(bookingId)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to get booking by ID`, async () => {
            const bookingId = 'booking_id';
            const error = new Error('Failed to get booking details.');
            BookingModel.findById.mockRejectedValue(error);
            await expect(bookingService.getBooking(bookingId)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to update booking by ID`, async () => {
            const bookingId = 'booking_id';
            const updatedBookingData = {
                user: 'updated_user_id',
                destination: 'updated_destination_id',
                startDate: new Date(),
                endDate: new Date(),
                status: 'Confirmed',
            };
            const error = new Error('Failed to update booking details.');
            BookingModel.findByIdAndUpdate.mockRejectedValue(error);
            await expect(bookingService.updateBooking(bookingId, updatedBookingData)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to create a new booking`, async () => {
            const bookingData = {
                user: 'user_id',
                destination: 'destination_id',
                startDate: new Date(),
                endDate: new Date(),
                status: 'Pending',
            };
            const error = new Error('Failed to create booking.');
            BookingModel.create.mockRejectedValue(error);
            await expect(bookingService.createBooking(bookingData)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to search bookings by user`, async () => {
            const userId = 'user_id';
            const error = new Error('Failed to search bookings by user.');
            BookingModel.find.mockRejectedValue(error);
            await expect(bookingService.searchBookingsByUser(userId)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to search bookings by status`, async () => {
            const status = 'Pending';
            const error = new Error('Failed to search bookings by status.');
            BookingModel.find.mockRejectedValue(error);
            await expect(bookingService.searchBookingsByStatus(status)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to get bookings by destination name`, async () => {
            const destinationName = 'destination_name';
            const error = new Error('Failed to get bookings by destination.');
            DestinationModel.find.mockRejectedValue(error);
            await expect(bookingService.getBookingsByDestination(destinationName)).rejects.toThrow(error);
        });

        it(`${bookingServiceBoundaryTest} should throw an error when failing to get upcoming bookings for user`, async () => {
            const userId = 'user_id';
            const error = new Error('Failed to get upcoming bookings for user.');
            BookingModel.find.mockRejectedValue(error);
            await expect(bookingService.getUpcomingBookingsForUser(userId)).rejects.toThrow(error);
        });
    });
});
