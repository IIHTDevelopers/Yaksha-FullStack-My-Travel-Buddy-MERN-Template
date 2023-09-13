import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TripPlanService from '../../../services/trip-plan.service';
import AllTrips from '../../../components/trip-plans/AllTrips';

jest.mock('../../../services/trip-plan.service');

describe('AllTripsComponent', () => {
    describe('boundary', () => {
        test('AllTripsComponent boundary Should render "No trips available." when there are no trips', () => {
            TripPlanService.getAllTripPlans.mockResolvedValue([]);
            render(<AllTrips />, { wrapper: MemoryRouter });
            const noTripsText = screen.getByText('No trips available.');
            expect(noTripsText).toBeTruthy();
        });

        test('AllTripsComponent boundary Should render trips when there are trips available', async () => {
            const mockTrips = [
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
                // Add more mock trip data if needed
            ];
            TripPlanService.getAllTripPlans.mockResolvedValue(mockTrips);
            render(<AllTrips />, { wrapper: MemoryRouter });
            await screen.findByText('All Trips');
            expect(screen.getByText(/Destination:/)).toBeTruthy();
            expect(screen.getByText(/User:/)).toBeTruthy();
            expect(screen.getByText(/Start Date:/)).toBeTruthy();
            expect(screen.getByText(/End Date:/)).toBeTruthy();
            expect(screen.getByText(/Activities:/)).toBeTruthy();
        });

        test('AllTripsComponent boundary Should render "Update Trip" link for each trip', async () => {
            const mockTrips = [
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
                // Add more mock trip data if needed
            ];
            TripPlanService.getAllTripPlans.mockResolvedValue(mockTrips);
            render(<AllTrips />, { wrapper: MemoryRouter });
            await screen.findByText('All Trips');
            const updateTripLinks = screen.getAllByText('Update Trip');
            expect(updateTripLinks.length).toBe(mockTrips.length);
        });
    });
});
