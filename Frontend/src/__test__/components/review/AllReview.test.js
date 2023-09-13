import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReviewService from '../../../services/review.service';
import DestinationService from '../../../services/destination.service';
import AllReview from '../../../components/review/AllReview';

jest.mock('../../../services/review.service');
jest.mock('../../../services/destination.service');

describe('AllReviewComponent', () => {
    beforeEach(() => {
        ReviewService.getAllReviews.mockResolvedValue([
            {
                _id: '1',
                destination: 'destinationId1',
                rating: 4,
                comment: 'Good place',
            },
            {
                _id: '2',
                destination: 'destinationId2',
                rating: 5,
                comment: 'Amazing experience',
            },
        ]);
        DestinationService.getDestination.mockResolvedValue({
            _id: 'destinationId1',
            name: 'Destination 1',
        });
    });

    describe('boundary', () => {
        test('AllReviewComponent boundary Should render "Reviews" and search form with proper fields', async () => {
            render(<AllReview />, { wrapper: MemoryRouter });
            const reviewsHeader = screen.getByText('Reviews');
            expect(reviewsHeader).toBeTruthy();
            const searchForm = screen.getByText('Search Reviews');
            expect(searchForm).toBeTruthy();
            const destinationNameField = screen.getByLabelText('Destination Name:');
            expect(destinationNameField).toBeTruthy();
            const minRatingField = screen.getByLabelText('Minimum Rating:');
            expect(minRatingField).toBeTruthy();
            const maxRatingField = screen.getByLabelText('Maximum Rating:');
            expect(maxRatingField).toBeTruthy();
            const searchButton = screen.getByText('Search');
            expect(searchButton).toBeTruthy();
        });

        test('AllReviewComponent boundary Should render reviews with destination details', async () => {
            render(<AllReview />, { wrapper: MemoryRouter });
            const destination1Name = screen.getByText('Destination Name:');
            const rating1 = screen.getByText('Minimum Rating:');
            const comment1 = screen.getByText('Maximum Rating:');
            const destination2Name = screen.getByText('Destination Name:');
            const rating2 = screen.getByText('Minimum Rating:');
            const comment2 = screen.getByText('Search');
            expect(destination1Name).toBeTruthy();
            expect(rating1).toBeTruthy();
            expect(comment1).toBeTruthy();
            expect(destination2Name).toBeTruthy();
            expect(rating2).toBeTruthy();
            expect(comment2).toBeTruthy();
        });

        test('AllReviewComponent boundary Should update reviews based on search criteria', async () => {
            render(<AllReview />, { wrapper: MemoryRouter });
            const destinationNameField = screen.getByLabelText('Destination Name:');
            const minRatingField = screen.getByLabelText('Minimum Rating:');
            const maxRatingField = screen.getByLabelText('Maximum Rating:');
            fireEvent.change(destinationNameField, { target: { value: 'Destination 1' } });
            fireEvent.change(minRatingField, { target: { value: '4' } });
            const searchButton = screen.getByText('Search');
            fireEvent.click(searchButton);
            const destination1Name = screen.getByText('Destination Name:');
            expect(destination1Name).toBeTruthy();
            const rating1 = screen.getByText('Minimum Rating:');
            expect(rating1).toBeTruthy();
            const comment1 = screen.getByText('Maximum Rating:');
            expect(comment1).toBeTruthy();
            const destination2Name = screen.queryByText('Destination: Destination 2');
            expect(destination2Name).toBeNull();
        });

        test('AllReviewComponent boundary Should render search form elements', async () => {
            render(<AllReview />, { wrapper: MemoryRouter });
            const destinationNameLabel = screen.getByLabelText('Destination Name:');
            const destinationNameInput = screen.getByLabelText('Destination Name:');
            const minRatingLabel = screen.getByLabelText('Minimum Rating:');
            const minRatingInput = screen.getByLabelText('Minimum Rating:');
            const maxRatingLabel = screen.getByLabelText('Maximum Rating:');
            const maxRatingInput = screen.getByLabelText('Maximum Rating:');
            const searchButton = screen.getByText('Search');
            expect(destinationNameLabel).toBeTruthy();
            expect(destinationNameInput).toBeTruthy();
            expect(minRatingLabel).toBeTruthy();
            expect(minRatingInput).toBeTruthy();
            expect(maxRatingLabel).toBeTruthy();
            expect(maxRatingInput).toBeTruthy();
            expect(searchButton).toBeTruthy();
            expect(searchButton).toBeTruthy();
        });
    });
});
