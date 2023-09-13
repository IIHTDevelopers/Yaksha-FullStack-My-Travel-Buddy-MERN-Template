import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import TopRatedDestinations from '../../../components/destination/TopRatedDestinations';
import DestinationService from '../../../services/destination.service';

jest.mock('../../../services/destination.service');

describe('TopRatedDestinationsComponent', () => {
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
        DestinationService.getTopRatedDestinations.mockReset();
    });

    describe('boundary', () => {
        test('TopRatedDestinationsComponent boundary Should render destinations when data is available', async () => {
            DestinationService.getTopRatedDestinations.mockResolvedValue(mockDestinations);
            render(<TopRatedDestinations />);
            await waitFor(() => {
                expect(screen.getByText('Destination 1')).toBeTruthy();
                expect(screen.getByText('Destination 2')).toBeTruthy();
            });
        });

        test('TopRatedDestinationsComponent boundary Should render "No Destination" message when no data is available', async () => {
            DestinationService.getTopRatedDestinations.mockResolvedValue([]);
            render(<TopRatedDestinations />);
            await waitFor(() => {
                expect(screen.getByText('No Destination')).toBeTruthy();
            });
        });
    });
});
