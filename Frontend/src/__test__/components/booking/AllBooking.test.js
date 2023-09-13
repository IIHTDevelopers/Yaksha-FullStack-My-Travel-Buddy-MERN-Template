import React from 'react';
import { render, fireEvent, waitFor, getAllByText } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingService from '../../../services/booking.service';
import DestinationService from '../../../services/destination.service';
import AllBooking from '../../../components/booking/AllBooking';

jest.mock('../../../services/booking.service');
jest.mock('../../../services/destination.service');

const mockBookings = [
    {
        _id: 'booking1',
        destination: 'destination1',
        date: '2023-09-15',
        status: 'Confirmed',
    },
    {
        _id: 'booking2',
        destination: 'destination2',
        date: '2023-09-20',
        status: 'Pending',
    },
];

const mockDestinationDetails = {
    destination1: { name: 'Destination One' },
    destination2: { name: 'Destination Two' },
};

describe('AllBookingComponent', () => {
    beforeEach(() => {
        BookingService.getAllBookings.mockResolvedValue(mockBookings);
        DestinationService.getDestination.mockImplementation((destinationId) => {
            return Promise.resolve(mockDestinationDetails[destinationId]);
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('boundary', () => {
        test('AllBookingComponent boundary should render bookings', async () => {
            const { getByText } = render(<AllBooking />, { wrapper: MemoryRouter });

            await waitFor(() => {
                expect(getByText('Destination: Destination One')).toBeTruthy();
                expect(getByText('Destination: Destination Two')).toBeTruthy();
                expect(getByText('Date: 2023-09-15')).toBeTruthy();
                expect(getByText('Date: 2023-09-20')).toBeTruthy();
                expect(getByText('Status: Confirmed')).toBeTruthy();
                expect(getByText('Status: Pending')).toBeTruthy();
            });
        });

        test('AllBookingComponent boundary should handle booking deletion', async () => {
            BookingService.getAllBookings.mockResolvedValue(mockBookings);
            BookingService.deleteBooking.mockResolvedValue('Booking deleted successfully');
            const { getAllByText, getByText } = render(<AllBooking />, { wrapper: MemoryRouter });
            await waitFor(() => {
                const deleteButtons = getAllByText('Delete Booking');
                const deleteButton = deleteButtons[0];
                fireEvent.click(deleteButton);
                expect(BookingService.deleteBooking).toHaveBeenCalledTimes(1);
                expect(BookingService.deleteBooking).toHaveBeenCalledWith('booking1');
            });
        });

        test('AllBookingComponent boundary should handle booking search', async () => {
            const { getByText, getByLabelText } = render(<AllBooking />, {
                wrapper: MemoryRouter,
            });

            const destinationNameInput = getByLabelText('Destination Name:');
            fireEvent.change(destinationNameInput, { target: { value: 'Destination One' } });

            const searchButton = getByText('Search');
            fireEvent.click(searchButton);

            await waitFor(() => {
                expect(BookingService.searchBookings).toHaveBeenCalledTimes(1);
                expect(BookingService.searchBookings).toHaveBeenCalledWith('Destination One');
            });
        });
    });
});
