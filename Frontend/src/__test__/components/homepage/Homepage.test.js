import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Homepage from '../../../components/homepage/Homepage';

describe('HomepageComponent', () => {
    describe('boundary', () => {
        test('HomepageComponent boundary should have "Homepage" text and it is bound to "/"', () => {
            render(<Router><Homepage /></Router>);
            const tripPlansLink = screen.getByText('Homepage');
            expect(tripPlansLink).toBeTruthy();
        });

        test('HomepageComponent boundary should have "Destination" text and it is bound to "/destination"', () => {
            render(<Router><Homepage /></Router>);
            const tripPlansLink = screen.getByText('Destination');
            expect(tripPlansLink).toBeTruthy();
        });

        test('HomepageComponent boundary should have "Reviews" text and it is bound to "/review"', () => {
            render(<Router><Homepage /></Router>);
            const tripPlansLink = screen.getByText('Reviews');
            expect(tripPlansLink).toBeTruthy();
        });

        test("HomepageComponent boundary should have 'Trip Plans' text and it is bound to '/trips'", () => {
            render(<Router><Homepage /></Router>);
            const tripPlansLink = screen.getByText('Trip Plans');
            expect(tripPlansLink).toBeTruthy();
        });

        test('HomepageComponent boundary should render Booking, My Account, and Logout links when logged in', () => {
            localStorage.setItem('token', 'your_token_here');
            render(
                <Router>
                    <Homepage />
                </Router>
            );
            const bookingLink = screen.getByText('Booking');
            const myAccountLink = screen.getByText('My Account');
            const logoutLink = screen.getByText('Logout');
            expect(bookingLink).toBeTruthy();
            expect(myAccountLink).toBeTruthy();
            expect(logoutLink).toBeTruthy();
        });

        test('HomepageComponent boundary should render Login link when not logged in', () => {
            localStorage.removeItem('token');
            render(
                <Router>
                    <Homepage />
                </Router>
            );
            const loginLink = screen.getByText('Login');
            expect(loginLink).toBeTruthy();
        });
    });
});
