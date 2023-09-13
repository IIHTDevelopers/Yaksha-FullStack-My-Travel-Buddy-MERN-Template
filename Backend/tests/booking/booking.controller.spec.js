const express = require('express');
const router = require('../../modules/booking/routes/booking.routes');
const BookingController = require('../../modules/booking/controller/booking.controller');
const BookingServiceImpl = require('../../modules/booking/service/impl/booking.serviceImpl');
const authGuard = require("../../modules/auth/middleware/auth.guard");

const app = express();
app.use(express.json());
app.use(authGuard);
app.use(router);

jest.mock('../../modules/booking/service/impl/booking.serviceImpl');

let bookingControllerBoundaryTest = `Booking boundary test`;
describe('Booking Controller', () => {
    describe('boundary', () => {
        it(`${bookingControllerBoundaryTest} should create a new booking`, async () => {
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
            const mNext = jest.fn();
            const mockBooking = {
                _id: 'mockBookingId',
                ...mReq.body,
            };
            BookingServiceImpl.prototype.createBooking.mockResolvedValueOnce(mockBooking);
            await new BookingController().createBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.createBooking).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(201);
            expect(mRes.json).toHaveBeenCalledWith(mockBooking);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should return a 400 error when missing required fields`, async () => {
            const mReq = {
                body: {
                    user: 'userId',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            await new BookingController().createBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.createBooking).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(400);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'User and destination are required.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should get a booking by ID`, async () => {
            const mockBookingId = 'mockBookingId';
            const mReq = {
                params: { bookingId: mockBookingId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const mockBooking = {
                _id: mockBookingId,
                user: 'userId',
                destination: 'Paris',
            };
            BookingServiceImpl.prototype.getBooking.mockResolvedValueOnce(mockBooking);
            await new BookingController().getBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.getBooking).toHaveBeenCalledWith(mockBookingId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockBooking);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should return a 404 error when getBooking fails`, async () => {
            const mockBookingId = 'mockBookingId';
            const mReq = {
                params: { bookingId: mockBookingId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const error = new Error('Booking not found.');
            BookingServiceImpl.prototype.getBooking.mockRejectedValueOnce(error);
            await new BookingController().getBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.getBooking).toHaveBeenCalledWith(mockBookingId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Booking not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should update booking details`, async () => {
            const mockBookingId = 'mockBookingId';
            const mReq = {
                params: { bookingId: mockBookingId },
                body: {
                    destination: 'New Destination',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const mockUpdatedBooking = {
                _id: mockBookingId,
                user: 'userId',
                destination: 'New Destination',
            };
            BookingServiceImpl.prototype.updateBooking.mockResolvedValueOnce(mockUpdatedBooking);
            await new BookingController().updateBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.updateBooking).toHaveBeenCalledWith(mockBookingId, mReq.body);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockUpdatedBooking);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should return a 500 error when updateBooking fails`, async () => {
            const mockBookingId = 'mockBookingId';
            const mReq = {
                params: { bookingId: mockBookingId },
                body: {
                    destination: 'New Destination',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const error = new Error('Failed to update booking details.');
            BookingServiceImpl.prototype.updateBooking.mockRejectedValueOnce(error);
            await new BookingController().updateBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.updateBooking).toHaveBeenCalledWith(mockBookingId, mReq.body);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to update booking details.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should delete a booking and return the deleted booking`, async () => {
            const mockBookingId = 'mockBookingId';
            const mReq = {
                params: { bookingId: mockBookingId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();

            const mockDeletedBooking = {
                _id: mockBookingId,
            };
            BookingServiceImpl.prototype.deleteBooking.mockResolvedValueOnce(mockDeletedBooking);
            await new BookingController().deleteBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.deleteBooking).toHaveBeenCalledWith(mockBookingId);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mRes.json).toHaveBeenCalledWith(mockDeletedBooking);
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should return a 404 error when deleteBooking fails`, async () => {
            const mockBookingId = 'mockBookingId';
            const mReq = {
                params: { bookingId: mockBookingId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
            const error = new Error('Booking not found.');
            BookingServiceImpl.prototype.deleteBooking.mockRejectedValueOnce(error);
            await new BookingController().deleteBooking(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.deleteBooking).toHaveBeenCalledWith(mockBookingId);
            expect(mRes.status).toHaveBeenCalledWith(404);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Booking not found.' });
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should search bookings by status`, async () => {
            const mReq = {
                query: {
                    status: 'confirmed',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();
            const mockBookings = [
                {
                    _id: 'bookingId1',
                    status: 'confirmed',
                },
                {
                    _id: 'bookingId2',
                    status: 'confirmed',
                },
            ];
            BookingServiceImpl.prototype.searchBookingsByStatus.mockResolvedValueOnce(mockBookings);
            await new BookingController().searchBookings(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.searchBookingsByStatus).toHaveBeenCalledWith('confirmed');
            expect(mRes.json).toHaveBeenCalledWith(mockBookings);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should search bookings by destination`, async () => {
            const mReq = {
                query: {
                    destinationName: 'Paris',
                },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();
            const mockBookings = [
                {
                    _id: 'bookingId1',
                    destination: 'Paris',
                },
                {
                    _id: 'bookingId2',
                    destination: 'Paris',
                },
            ];
            BookingServiceImpl.prototype.getBookingsByDestination.mockResolvedValueOnce(mockBookings);
            await new BookingController().searchBookings(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.getBookingsByDestination).toHaveBeenCalledWith('Paris');
            expect(mRes.json).toHaveBeenCalledWith(mockBookings);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should get all bookings for the authenticated user`, async () => {
            const mockUserId = 'userId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();
            const mockBookings = [
                {
                    _id: 'bookingId1',
                    user: mockUserId,
                },
                {
                    _id: 'bookingId2',
                    user: mockUserId,
                },
            ];
            BookingServiceImpl.prototype.searchBookingsByUser.mockResolvedValueOnce(mockBookings);
            await new BookingController().getAllBookings(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.searchBookingsByUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockBookings);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should get upcoming bookings for the authenticated user`, async () => {
            const mockUserId = 'userId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
            };
            const mNext = jest.fn();
            const mockUpcomingBookings = [
                {
                    _id: 'bookingId1',
                    user: mockUserId,
                    startDate: new Date('2023-09-15'),
                    endDate: new Date('2023-09-20'),
                },
                {
                    _id: 'bookingId2',
                    user: mockUserId,
                    startDate: new Date('2023-10-01'),
                    endDate: new Date('2023-10-10'),
                },
            ];
            BookingServiceImpl.prototype.getUpcomingBookingsForUser.mockResolvedValueOnce(mockUpcomingBookings);
            await new BookingController().getUpcomingBookingsForUser(mReq, mRes, mNext);
            expect(BookingServiceImpl.prototype.getUpcomingBookingsForUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.json).toHaveBeenCalledWith(mockUpcomingBookings);
            expect(mRes.status).not.toHaveBeenCalled();
            expect(mNext).not.toHaveBeenCalled();
        });

        it(`${bookingControllerBoundaryTest} should return a 500 error when createBooking fails`, async () => {
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
            const mNext = jest.fn();
    
            const error = new Error('Failed to create booking.');
            BookingServiceImpl.prototype.createBooking.mockRejectedValueOnce(error);
    
            await new BookingController().createBooking(mReq, mRes, mNext);
    
            expect(BookingServiceImpl.prototype.createBooking).toHaveBeenCalledWith(expect.objectContaining(mReq.body));
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to create booking.' });
            expect(mNext).not.toHaveBeenCalled();
        });     
    
        it(`${bookingControllerBoundaryTest} should return a 500 error when searchBookingsByStatus fails`, async () => {
            const mReq = {
                query: {
                    status: 'confirmed',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
    
            const error = new Error('Failed to search bookings by status.');
            BookingServiceImpl.prototype.searchBookingsByStatus.mockRejectedValueOnce(error);
    
            await new BookingController().searchBookings(mReq, mRes, mNext);
    
            expect(BookingServiceImpl.prototype.searchBookingsByStatus).toHaveBeenCalledWith('confirmed');
            expect(BookingServiceImpl.prototype.getBookingsByDestination).not.toHaveBeenCalled();
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to search bookings by status.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    
        it(`${bookingControllerBoundaryTest} should return a 500 error when getBookingsByDestination fails`, async () => {
            const mReq = {
                query: {
                    destinationName: 'Paris',
                },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
    
            const error = new Error('Failed to get bookings by destination.');
            BookingServiceImpl.prototype.getBookingsByDestination.mockRejectedValueOnce(error);
    
            await new BookingController().searchBookings(mReq, mRes, mNext);
    
            expect(BookingServiceImpl.prototype.searchBookingsByStatus).not.toHaveBeenCalled();
            expect(BookingServiceImpl.prototype.getBookingsByDestination).toHaveBeenCalledWith('Paris');
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get bookings by destination.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    
        it(`${bookingControllerBoundaryTest} should return a 500 error when getAllBookings fails`, async () => {
            const mockUserId = 'userId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
    
            const error = new Error('Failed to get all bookings.');
            BookingServiceImpl.prototype.searchBookingsByUser.mockRejectedValueOnce(error);
    
            await new BookingController().getAllBookings(mReq, mRes, mNext);
    
            expect(BookingServiceImpl.prototype.searchBookingsByUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get all bookings.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    
        it(`${bookingControllerBoundaryTest} should return a 500 error when getUpcomingBookingsForUser fails`, async () => {
            const mockUserId = 'userId';
            const mReq = {
                user: { _id: mockUserId },
            };
            const mRes = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mNext = jest.fn();
    
            const error = new Error('Failed to get upcoming bookings for user.');
            BookingServiceImpl.prototype.getUpcomingBookingsForUser.mockRejectedValueOnce(error);
    
            await new BookingController().getUpcomingBookingsForUser(mReq, mRes, mNext);
    
            expect(BookingServiceImpl.prototype.getUpcomingBookingsForUser).toHaveBeenCalledWith(mockUserId);
            expect(mRes.status).toHaveBeenCalledWith(500);
            expect(mRes.json).toHaveBeenCalledWith({ error: 'Failed to get upcoming bookings for user.' });
            expect(mNext).not.toHaveBeenCalled();
        });
    });
});
