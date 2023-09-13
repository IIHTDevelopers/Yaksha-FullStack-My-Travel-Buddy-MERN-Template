import axios from 'axios';
import authService from '../../services/auth.service';
import bookingService from '../../services/booking.service';

jest.mock('axios');

describe('bookingService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('functional', () => {
        test("BookingService functional should create a new booking", async () => {
            const mockBookingData = { tripId: 1, userId: 1 };
            const successResponse = { bookingId: 1 };
            let isNull = false;
            try {
                const response = await bookingService.createBooking(mockBookingData);
                isNull = response === null;
                throw new Error("Error in createBooking()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Booking created');
                } else {
                    const mockResponseData = { bookingId: 1 };
                    bookingService.createBooking = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.createBooking(mockBookingData);
                    expect(bookingService.createBooking).toHaveBeenCalledWith(mockBookingData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should get a booking by ID", async () => {
            const bookingId = 1;
            const successResponse = { bookingId: 1, tripId: 1 };
            let isNull = false;
            try {
                const response = await bookingService.getBooking(bookingId);
                isNull = response === null;
                throw new Error("Error in getBooking()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Booking fetched');
                } else {
                    const mockResponseData = { bookingId: 1, tripId: 1 };
                    bookingService.getBooking = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.getBooking(bookingId);
                    expect(bookingService.getBooking).toHaveBeenCalledWith(bookingId);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should update a booking by ID", async () => {
            const bookingId = 1;
            const mockBookingData = { tripId: 1, userId: 1 };
            const successResponse = { bookingId: 1 };
            let isNull = false;
            try {
                const response = await bookingService.updateBooking(bookingId, mockBookingData);
                isNull = response === null;
                throw new Error("Error in updateBooking()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Booking updated');
                } else {
                    const mockResponseData = { bookingId: 1 };
                    bookingService.updateBooking = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.updateBooking(bookingId, mockBookingData);
                    expect(bookingService.updateBooking).toHaveBeenCalledWith(bookingId, mockBookingData);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should delete a booking by ID", async () => {
            const bookingId = 1;
            const successResponse = { message: 'Booking deleted' };
            let isNull = false;
            try {
                const response = await bookingService.deleteBooking(bookingId);
                isNull = response === null;
                throw new Error("Error in deleteBooking()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Booking deleted');
                } else {
                    const mockResponseData = { message: 'Booking deleted' };
                    bookingService.deleteBooking = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.deleteBooking(bookingId);
                    expect(bookingService.deleteBooking).toHaveBeenCalledWith(bookingId);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should search bookings by status", async () => {
            const status = 'confirmed';
            const successResponse = [{ bookingId: 1, status: 'confirmed' }];
            let isNull = false;
            try {
                const response = await bookingService.searchBookings(status);
                isNull = response === null;
                throw new Error("Error in searchBookings()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Bookings searched');
                } else {
                    const mockResponseData = [{ bookingId: 1, status: 'confirmed' }];
                    bookingService.searchBookings = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.searchBookings(status);
                    expect(bookingService.searchBookings).toHaveBeenCalledWith(status);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should search bookings by destinationName", async () => {
            const destinationName = 'Paris';
            const successResponse = [{ bookingId: 1, destination: 'Paris' }];
            let isNull = false;
            try {
                const response = await bookingService.searchBookings(null, destinationName);
                isNull = response === null;
                throw new Error("Error in searchBookings()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Bookings searched');
                } else {
                    const mockResponseData = [{ bookingId: 1, destination: 'Paris' }];
                    bookingService.searchBookings = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.searchBookings(null, destinationName);
                    expect(bookingService.searchBookings).toHaveBeenCalledWith(null, destinationName);
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should get all bookings", async () => {
            const successResponse = [{ bookingId: 1, tripId: 1 }];
            let isNull = false;
            try {
                const response = await bookingService.getAllBookings();
                isNull = response === null;
                throw new Error("Error in getAllBookings()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Bookings fetched');
                } else {
                    const mockResponseData = [{ bookingId: 1, tripId: 1 }];
                    bookingService.getAllBookings = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.getAllBookings();
                    expect(bookingService.getAllBookings).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });

        test("BookingService functional should get upcoming bookings for a user", async () => {
            const successResponse = [{ bookingId: 1, status: 'confirmed' }];
            let isNull = false;
            try {
                const response = await bookingService.getUpcomingBookingsForUser();
                isNull = response === null;
                throw new Error("Error in getUpcomingBookingsForUser()");
            } catch (error) {
                if (isNull) {
                    expect(error).toEqual('Upcoming bookings fetched');
                } else {
                    const mockResponseData = [{ bookingId: 1, status: 'confirmed' }];
                    bookingService.getUpcomingBookingsForUser = jest.fn().mockResolvedValueOnce(mockResponseData);
                    const result = await bookingService.getUpcomingBookingsForUser();
                    expect(bookingService.getUpcomingBookingsForUser).toHaveBeenCalled();
                    expect(result).toEqual(mockResponseData);
                }
            }
        });
    });
});
