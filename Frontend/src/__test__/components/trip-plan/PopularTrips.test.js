import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TripPlanService from '../../../services/trip-plan.service';
import PopularTrips from '../../../components/trip-plans/PopularTrips';

import * as tripPlanService from '../../../services/trip-plan.service';

jest.mock('../../../services/trip-plan.service');

describe('PopularTripsComponent', () => {
    describe('boundary', () => {
        test('PopularTripsComponent boundary Should render "No popular trips available." when there are no popular trips', () => {
            render(<PopularTrips popularTrips={[]} />);
            const noTripsText = screen.getByText('No popular trips available.');
            expect(noTripsText).toBeTruthy();
        });

        test('PopularTripsComponent boundary should render popular trips when there are popular trips available', async () => {
            const mockPopularTrips = [
                {
                    _id: '1',
                    destination: 'destinationId1',
                    user: 'User 1',
                    startDate: '2023-09-10',
                    endDate: '2023-09-20',
                    activities: ['Activity 1', 'Activity 2'],
                    accommodations: {
                        Location1: 'Details 1',
                        Location2: 'Details 2',
                    },
                },
            ];
            TripPlanService.getPopularTripPlans.mockResolvedValue(mockPopularTrips);
            render(<PopularTrips />);
            await screen.findByText('Popular Trips');
            expect(screen.getByText(/Destination:/)).toBeTruthy();
            expect(screen.getByText(/User:/)).toBeTruthy();
            expect(screen.getByText(/Start Date:/)).toBeTruthy();
            expect(screen.getByText(/End Date:/)).toBeTruthy();
            expect(screen.getByText(/Activities:/)).toBeTruthy();
        });
    });
});
