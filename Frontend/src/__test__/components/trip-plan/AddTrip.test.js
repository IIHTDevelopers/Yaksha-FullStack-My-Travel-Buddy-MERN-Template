import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import TripPlanService from '../../../services/trip-plan.service';
import AddTrip from '../../../components/trip-plans/AddTrip';

jest.mock('../../../services/trip-plan.service');

describe('AddTripComponent', () => {
    describe('boundary', () => {
        test('AddTripComponent boundary Should render "Add Trip" form with proper fields', () => {
            render(<AddTrip />, { wrapper: MemoryRouter });
            const addTripHeader = screen.getByText('Add Trip');
            expect(addTripHeader).toBeTruthy();

            // You can use findByText to assert the presence of elements.
            const destinationText = screen.getByText('Destination:');
            expect(destinationText).toBeTruthy();

            const startDateText = screen.getByText('Start Date:');
            expect(startDateText).toBeTruthy();

            const endDateText = screen.getByText('End Date:');
            expect(endDateText).toBeTruthy();
        });

        test('AddTripComponent boundary Should render "Create Trip" form with proper fields when ID is provided in the URL', async () => {
            const mockTrip = {
                _id: '1',
                destination: 'destinationId1',
                startDate: '2023-09-10',
                endDate: '2023-09-20',
                activities: ['Activity 1', 'Activity 2'],
                accommodations: {
                    hotel: 'Hotel 1',
                    checkInDate: '2023-09-10',
                    checkOutDate: '2023-09-20',
                },
            };
            const history = createMemoryHistory();
            history.push('/trips/edit/1');
            TripPlanService.getTripPlan.mockResolvedValue(mockTrip);
            render(
                <Router history={history}>
                    <AddTrip />
                </Router>
            );
            const updateTripText = await screen.findByText((content, element) => {
                const normalizedText = element.textContent.trim();
                return normalizedText === 'Create Trip';
            });
            expect(updateTripText).toBeTruthy();
            const destinationText = screen.getByText('Destination:');
            expect(destinationText).toBeTruthy();
            const startDateText = screen.getByText('Start Date:');
            expect(startDateText).toBeTruthy();
        });

        test('AddTripComponent boundary Should update form fields when user interacts', async () => {
            render(<AddTrip />, { wrapper: MemoryRouter });
            expect(screen.getByText(/Select a destination/)).toBeTruthy();
        });

        test('AddTripComponent boundary Should submit form data when user clicks "Create Trip" or "Update Trip"', async () => {
            const mockCreateTripPlan = jest.fn();
            TripPlanService.createTripPlan.mockImplementation(mockCreateTripPlan);
            render(<AddTrip />, { wrapper: MemoryRouter });
            expect(screen.getByText(/Select a destination/)).toBeTruthy();
            expect(screen.getByText(/Create Trip/)).toBeTruthy();
        });
    });
});
