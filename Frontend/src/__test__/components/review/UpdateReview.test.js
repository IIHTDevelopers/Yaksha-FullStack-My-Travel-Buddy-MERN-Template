import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import ReviewService from '../../../services/review.service';
import UpdateReview from '../../../components/review/UpdateReview';

jest.mock('../../../services/review.service');

describe('UpdateReviewComponent', () => {
    describe('boundary', () => {
        test('UpdateReviewComponent boundary Should render "Edit Review" form with proper fields', () => {
            render(<UpdateReview />, { wrapper: MemoryRouter });
            const ratingInput = screen.getByLabelText('Rating:');
            expect(ratingInput).toBeTruthy();
            expect(ratingInput.getAttribute('type')).toBe('number');
            const commentInput = screen.getByLabelText('Comment:');
            expect(commentInput).toBeTruthy();
            expect(commentInput.getAttribute('name')).toBe('comment');
            const helpfulVotesInput = screen.getByLabelText('Helpful Votes:');
            expect(helpfulVotesInput).toBeTruthy();
            expect(helpfulVotesInput.getAttribute('type')).toBe('number');
            const updateButton = screen.getByText('Update');
            expect(updateButton).toBeTruthy();
        });

        test('UpdateReviewComponent boundary Should update form fields when user interacts', async () => {
            render(<UpdateReview />, { wrapper: MemoryRouter });
            const ratingInput = screen.getByLabelText('Rating:');
            const commentInput = screen.getByLabelText('Comment:');
            const helpfulVotesInput = screen.getByLabelText('Helpful Votes:');
            fireEvent.change(ratingInput, { target: { value: '5' } });
            fireEvent.change(commentInput, { target: { value: 'Great review!' } });
            fireEvent.change(helpfulVotesInput, { target: { value: '10' } });
            await waitFor(() => {
                expect(ratingInput.value).toBe('5');
                expect(commentInput.value).toBe('Great review!');
                expect(helpfulVotesInput.value).toBe('10');
            });
        });

        test('UpdateReviewComponent boundary Should submit form data when user clicks "Update"', async () => {
            const mockUpdateReview = jest.fn();
            ReviewService.updateReview.mockImplementation(mockUpdateReview);
            render(<UpdateReview />, { wrapper: MemoryRouter });
            const ratingInput = screen.getByLabelText('Rating:');
            const commentInput = screen.getByLabelText('Comment:');
            const helpfulVotesInput = screen.getByLabelText('Helpful Votes:');
            fireEvent.change(ratingInput, { target: { value: '5' } });
            fireEvent.change(commentInput, { target: { value: 'Great review!' } });
            fireEvent.change(helpfulVotesInput, { target: { value: '10' } });
            const updateButton = screen.getByText('Update');
            fireEvent.click(updateButton);
            expect(mockUpdateReview).toHaveBeenCalled();
        });
    });
});
