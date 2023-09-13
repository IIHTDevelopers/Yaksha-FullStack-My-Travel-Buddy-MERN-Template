import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AllDestination from '../../../components/destination/AllDestinations';
import DestinationService from '../../../services/destination.service';
import authService from '../../../services/auth.service';

jest.mock('../../../services/destination.service');
jest.mock('../../../services/auth.service');

describe('AllDestinationComponent', () => {
    const mockDestinations = [
        {
            _id: '1',
            name: 'Destination 1',
            description: 'Description 1',
            category: 'Category 1',
            budget: 1000,
            imageUrl: 'image1.jpg',
            attractions: ['Attraction 1A', 'Attraction 1B'],
        },
        {
            _id: '2',
            name: 'Destination 2',
            description: 'Description 2',
            category: 'Category 2',
            budget: 1500,
            imageUrl: 'image2.jpg',
            attractions: ['Attraction 2A', 'Attraction 2B'],
        },
    ];

    beforeEach(() => {
        DestinationService.getAllDestinations.mockReset();
        DestinationService.searchDestinations.mockReset();
        DestinationService.deleteDestination.mockReset();
        authService.isLoggedIn.mockReset();
    });

    describe('boundary', () => {
        test('AllDestinationComponent boundary Should render destinations when data is available', async () => {
            DestinationService.getAllDestinations.mockResolvedValue(mockDestinations);
            authService.isLoggedIn.mockReturnValue(true);
            render(<AllDestination />, { wrapper: MemoryRouter });
            await waitFor(() => {
                expect(screen.getByText('Destination 1')).toBeTruthy();
                expect(screen.getByText('Destination 2')).toBeTruthy();
            });
        });

        test('AllDestinationComponent boundary Should render "No Destination" message when no data is available', async () => {
            DestinationService.getAllDestinations.mockResolvedValue([]);
            authService.isLoggedIn.mockReturnValue(true);
            render(<AllDestination />, { wrapper: MemoryRouter });
            await waitFor(() => {
                expect(screen.getByText('No Destination')).toBeTruthy();
            });
        });

        test('AllDestinationComponent boundary Should handle search with valid query parameters', async () => {
            DestinationService.searchDestinations.mockResolvedValue(mockDestinations);
            authService.isLoggedIn.mockReturnValue(true);
            render(<AllDestination />, { wrapper: MemoryRouter });
            const nameInput = screen.getByLabelText('Name:');
            fireEvent.change(nameInput, { target: { value: 'Destination 1' } });
            const categoryInput = screen.getByLabelText('Category:');
            fireEvent.change(categoryInput, { target: { value: 'Category 1' } });
            const minBudgetInput = screen.getByLabelText('Min Budget:');
            fireEvent.change(minBudgetInput, { target: { value: '1000' } });
            const maxBudgetInput = screen.getByLabelText('Max Budget:');
            fireEvent.change(maxBudgetInput, { target: { value: '2000' } });
            const searchButton = screen.getByText('Search');
            fireEvent.click(searchButton);
            expect(searchButton).toBeTruthy();
        });

        test('AllDestinationComponent boundary Should handle search with empty query parameters', async () => {
            DestinationService.getAllDestinations.mockResolvedValue(mockDestinations);
            authService.isLoggedIn.mockReturnValue(true);
            render(<AllDestination />, { wrapper: MemoryRouter });
            const searchButton = screen.getByText('Search');
            fireEvent.click(searchButton);
            await waitFor(() => {
                expect(screen.getByText('Destination 1')).toBeTruthy();
                expect(screen.getByText('Destination 2')).toBeTruthy();
            });
        });

        test('AllDestinationComponent boundary Should render "Add Review" link when logged in', async () => {
            DestinationService.getAllDestinations.mockResolvedValue(mockDestinations);
            authService.isLoggedIn.mockReturnValue(true);
            render(<AllDestination />, { wrapper: MemoryRouter });
            await waitFor(() => {
                expect(screen.getAllByText('Add Review')).toBeTruthy();
            });
        });

        test('AllDestinationComponent boundary Should not render "Add Review" link when not logged in', async () => {
            DestinationService.getAllDestinations.mockResolvedValue(mockDestinations);
            authService.isLoggedIn.mockReturnValue(false);
            render(<AllDestination />, { wrapper: MemoryRouter });
            await waitFor(() => {
                expect(screen.queryByText('Add Review')).toBeNull();
            });
        });
    });
});
