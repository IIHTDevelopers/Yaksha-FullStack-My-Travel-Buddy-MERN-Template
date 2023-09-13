import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe("appComponent", () => {
    describe('boundary', () => {
        test("AppComponent boundary renders Homepage component for / route", () => {
            render(
                <Router initialEntries={['/']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Homepage')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Login component for /login route", () => {
            render(
                <Router initialEntries={['/login']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

        test("AppComponent boundary renders review component for /review route", () => {
            render(
                <Router initialEntries={['/review']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Reviews')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Destination component for /destination route", () => {
            render(
                <Router initialEntries={['/destination']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Destination')).toBeInTheDocument();
        });

        test("AppComponent boundary renders Trip Plans component for /trips route", () => {
            render(
                <Router initialEntries={['/trips']}>
                    <App />
                </Router>
            );
            expect(screen.getByText('Trip Plans')).toBeInTheDocument();
        });
    });
});
