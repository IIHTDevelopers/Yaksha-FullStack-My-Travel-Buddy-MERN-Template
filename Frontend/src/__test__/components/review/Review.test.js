import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Review from '../../../components/review/Review';

describe('ReviewComponent', () => {
    describe('boundary', () => {
        test('ReviewComponent boundary Should render the Review component with the title', () => {
            render(
                <Router>
                    <Review />
                </Router>
            );
            expect(screen.getByText('Reviews')).toBeTruthy();
        });

        test('ReviewComponent boundary Should render the "All Reviews" link with the correct URL', () => {
            render(
                <Router>
                    <Review />
                </Router>
            );
            const addReviewLink = screen.getByText('All reviews');
            expect(addReviewLink).toBeTruthy();
            const hrefAttribute = addReviewLink.getAttribute('href');
            expect(hrefAttribute).toBe('/review/all');
        });
    });
});
