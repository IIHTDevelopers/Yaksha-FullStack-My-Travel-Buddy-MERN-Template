import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ReviewService from '../../../services/review.service';
import AddReview from '../../../components/review/AddReview';

jest.mock('../../../services/review.service');

describe('AddReviewComponent', () => {
    describe('boundary', () => {
        test('AddReviewComponent boundary Should render "Add Review" form with proper fields', () => {
            render(<AddReview />, { wrapper: MemoryRouter });
            const ratingInput = screen.getByLabelText('Rating:');
            const commentInput = screen.getByLabelText('Comment:');
            const helpfulVotesInput = screen.getByLabelText('Helpful Votes:');
            const createButton = screen.getByText('Create');
            expect(ratingInput).toBeTruthy();
            expect(commentInput).toBeTruthy();
            expect(helpfulVotesInput).toBeTruthy();
            expect(createButton).toBeTruthy();
        });

        test('AddReviewComponent boundary Should submit form data when user clicks "Create"', async () => {
            const mockCreateReview = jest.fn();
            ReviewService.createReview.mockImplementation(mockCreateReview);
            render(<AddReview />, { wrapper: MemoryRouter });
            const ratingInput = screen.getByLabelText('Rating:');
            const commentInput = screen.getByLabelText('Comment:');
            const helpfulVotesInput = screen.getByLabelText('Helpful Votes:');
            const createButton = screen.getByText('Create');
            fireEvent.change(ratingInput, { target: { value: '5' } });
            fireEvent.change(commentInput, { target: { value: 'Great review!' } });
            fireEvent.change(helpfulVotesInput, { target: { value: '10' } });
            fireEvent.click(createButton);
            expect(mockCreateReview).toHaveBeenCalledWith({
                user: '64eca3aa636c9fd96a9b2924',
                rating: '5',
                comment: 'Great review!',
                helpfulVotes: '10',
            });
        });

        test('AddReviewComponent boundary Should update review when user submits the form', async () => {
            const mockCreateReview = jest.fn();
            ReviewService.createReview.mockImplementation(mockCreateReview);
            const { getByLabelText, getByText } = render(
                <MemoryRouter>
                    <AddReview />
                </MemoryRouter>
            );
            const ratingInput = getByLabelText('Rating:');
            fireEvent.change(ratingInput, { target: { value: '5' } });
            const commentInput = getByLabelText('Comment:');
            fireEvent.change(commentInput, { target: { value: 'Great review!' } });
            const helpfulVotesInput = getByLabelText('Helpful Votes:');
            fireEvent.change(helpfulVotesInput, { target: { value: '10' } });
            const createButton = getByText('Create');
            fireEvent.click(createButton);
            expect(mockCreateReview).toHaveBeenCalledWith({
                user: '64eca3aa636c9fd96a9b2924',
                rating: '5',
                comment: 'Great review!',
                helpfulVotes: '10',
            });
        });
    });
});
