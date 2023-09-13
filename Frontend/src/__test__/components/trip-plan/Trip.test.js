import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Trip from '../../../components/trip-plans/Trip';

describe('TripComponent', () => {
    describe('boundary', () => {
        test('TripComponent boundary Should render the Trip component with the title', () => {
            render(
                <Router>
                    <Trip />
                </Router>
            );
            expect(screen.getByText('Trips')).toBeTruthy();
        });

        test('TripComponent boundary Should render the "Add Trip" link with the correct URL', () => {
            render(
                <Router>
                    <Trip />
                </Router>
            );
            const addTripLink = screen.getByText('Add Trip');
            expect(addTripLink).toBeTruthy();
            const hrefAttribute = addTripLink.getAttribute('href');
            expect(hrefAttribute).toBe('/trips/add/:id');
        });

        test('TripComponent boundary Should render the "All Trips" link with the correct URL', () => {
            render(
                <Router>
                    <Trip />
                </Router>
            );
            const allTripsLink = screen.getByText('All Trips');
            expect(allTripsLink).toBeTruthy();
            const hrefAttribute = allTripsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/trips/all');
        });

        test('TripComponent boundary Should render the "Popular Trips" link with the correct URL', () => {
            render(
                <Router>
                    <Trip />
                </Router>
            );
            const popularTripsLink = screen.getByText('Popular Trips');
            expect(popularTripsLink).toBeTruthy();
            const hrefAttribute = popularTripsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/trips/popular');
        });

        test('TripComponent boundary Should render the "My Trips" link with the correct URL', () => {
            render(
                <Router>
                    <Trip />
                </Router>
            );
            const myTripsLink = screen.getByText('My Trips');
            expect(myTripsLink).toBeTruthy();
            const hrefAttribute = myTripsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/trips/me');
        });
    });
});
