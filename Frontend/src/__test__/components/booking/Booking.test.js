import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Booking from '../../../components/booking/Booking';

describe('BookingComponent', () => {
    describe('boundary', () => {
        test('BookingComponent boundary Should render the Booking component with the title', () => {
            render(
                <Router>
                    <Booking />
                </Router>
            );
            expect(screen.getByText('Booking')).toBeTruthy();
        });

        test('BookingComponent boundary Should render the "Add Booking" link with the correct URL', () => {
            render(
                <Router>
                    <Booking />
                </Router>
            );
            const addBookingLink = screen.getByText('Add Booking');
            expect(addBookingLink).toBeTruthy();
            const hrefAttribute = addBookingLink.getAttribute('href');
            expect(hrefAttribute).toBe('/booking/add/:id');
        });

        test('BookingComponent boundary Should render the "All Bookings" link with the correct URL', () => {
            render(
                <Router>
                    <Booking />
                </Router>
            );
            const allBookingsLink = screen.getByText('All Bookings');
            expect(allBookingsLink).toBeTruthy();
            const hrefAttribute = allBookingsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/booking/all');
        });

        test('BookingComponent boundary Should render the "Upcoming Booking" link with the correct URL', () => {
            render(
                <Router>
                    <Booking />
                </Router>
            );
            const popularBookingsLink = screen.getByText('Upcoming Booking');
            expect(popularBookingsLink).toBeTruthy();
            const hrefAttribute = popularBookingsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/booking/upcoming');
        });
    });
});
