import React from 'react';
import { getAllByAltText, getAllByText, render, waitFor } from '@testing-library/react';
import UpcomingBooking from '../../../components/booking/UpcomingBooking';
import BookingService from '../../../services/booking.service';

jest.mock('../../../services/booking.service');

const mockUpcomingBookings = [
    {
        _id: 'booking1',
        destinationName: 'Destination 1',
        date: '2023-09-15',
        status: 'Upcoming',
    },
    {
        _id: 'booking2',
        destinationName: 'Destination 2',
        date: '2023-09-20',
        status: 'Upcoming',
    },
];

describe('UpcomingBookingComponent', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('boundary', () => {
        test('UpcomingBookingComponent boundary should render "No upcoming bookings available." when there are no upcoming bookings', async () => {
            BookingService.getUpcomingBookingsForUser.mockResolvedValue([]);
            const { getByText } = render(<UpcomingBooking />);
            await waitFor(() => {
                expect(getByText('No upcoming bookings available.')).toBeTruthy();
            });
        });

        test('UpcomingBookingComponent boundary should render upcoming bookings', async () => {
            BookingService.getUpcomingBookingsForUser.mockResolvedValue(mockUpcomingBookings);
            const { getAllByText } = render(<UpcomingBooking />);
            await waitFor(() => {
                mockUpcomingBookings.forEach((booking) => {
                    expect(getAllByText(new RegExp(`Destination:.*${booking.destinationName}`))).toBeTruthy();
                    expect(getAllByText(new RegExp(`Date:.*${booking.date}`))).toBeTruthy();
                    expect(getAllByText('Status: Upcoming')).toBeTruthy();
                });
            });
        });
    });
});
