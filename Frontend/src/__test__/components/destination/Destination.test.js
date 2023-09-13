import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Destination from '../../../components/destination/Destination';

describe('DestinationComponent', () => {
    describe('boundary', () => {
        test('DestinationComponent boundary Should render the Destination component with the title', () => {
            render(
                <Router>
                    <Destination />
                </Router>
            );
            expect(screen.getByText('Destination')).toBeTruthy();
        });

        test('DestinationComponent boundary Should render the "Add Destination" link with the correct URL', () => {
            render(
                <Router>
                    <Destination />
                </Router>
            );
            const adddestinationLink = screen.getByText('Add Destination');
            expect(adddestinationLink).toBeTruthy();
            const hrefAttribute = adddestinationLink.getAttribute('href');
            expect(hrefAttribute).toBe('/destination/add/:id');
        });

        test('DestinationComponent boundary Should render the "All Destinations" link with the correct URL', () => {
            render(
                <Router>
                    <Destination />
                </Router>
            );
            const alldestinationsLink = screen.getByText('All Destinations');
            expect(alldestinationsLink).toBeTruthy();
            const hrefAttribute = alldestinationsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/destination/all');
        });

        test('DestinationComponent boundary Should render the "TopRated Destinations" link with the correct URL', () => {
            render(
                <Router>
                    <Destination />
                </Router>
            );
            const populardestinationsLink = screen.getByText('TopRated Destinations');
            expect(populardestinationsLink).toBeTruthy();
            const hrefAttribute = populardestinationsLink.getAttribute('href');
            expect(hrefAttribute).toBe('/destination/top-rated');
        });
    });
});
