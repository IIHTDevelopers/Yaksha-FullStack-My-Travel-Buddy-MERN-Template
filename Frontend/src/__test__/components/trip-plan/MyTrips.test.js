import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TripPlanService from '../../../services/trip-plan.service';
import MyTrips from '../../../components/trip-plans/MyTrips';

jest.mock('../../../services/trip-plan.service');

describe('MyTripsComponent', () => {
    describe('boundary', () => {
        test('MyTripsComponent boundary Should render "No trips available." when there are no trips', () => {
            TripPlanService.getTripPlansByUser.mockResolvedValue([]);
            render(<MyTrips userId="123" />);
            const noTripsText = screen.getByText('No trips available.');
            expect(noTripsText).toBeTruthy();
        });

        test('MyTripsComponent boundary Should render trips when there are trips available', async () => {
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
            ];
            TripPlanService.getTripPlansByUser.mockResolvedValue(mockTrips);
            render(<MyTrips userId="123" />);
            await screen.findByText('My Trips');
            expect(screen.getByText(/Destination:/)).toBeTruthy();
            expect(screen.getByText(/User:/)).toBeTruthy();
            expect(screen.getByText(/Start Date:/)).toBeTruthy();
            expect(screen.getByText(/End Date:/)).toBeTruthy();
            expect(screen.getByText(/Activities:/)).toBeTruthy();
        });
    });
});
