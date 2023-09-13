import { render, screen, fireEvent } from '@testing-library/react';
import User from '../../../components/user/User';
import UserService from '../../../services/user.service';
import DestinationService from '../../../services/destination.service';

jest.mock('../../../services/user.service');
jest.mock('../../../services/destination.service');

describe('UserComponent', () => {
    const user = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
    };

    const trips = [
        {
            _id: 'trip1',
            destination: 'destination1',
            startDate: '2023-09-10',
            endDate: '2023-09-20',
        },
    ];

    const bookings = [
        {
            _id: 'booking1',
            destination: 'destination2',
        },
    ];

    const reviews = [
        {
            _id: 'review1',
            comment: 'Great place!',
        },
    ];

    const upcomingTrips = trips;

    const pastTrips = trips;

    const destinationDetails = {
        destination1: 'Destination 1',
        destination2: 'Destination 2',
    };

    beforeEach(() => {
        UserService.getUser.mockResolvedValue(user);
        UserService.getTripPlans.mockResolvedValue(trips);
        UserService.getUserBookings.mockResolvedValue(bookings);
        UserService.getUserReviews.mockResolvedValue(reviews);
        UserService.getUpcomingTrips.mockResolvedValue(upcomingTrips);
        UserService.getPastTrips.mockResolvedValue(pastTrips);
        DestinationService.getDestination.mockImplementation((destinationId) => {
            return Promise.resolve({ _id: destinationId, name: destinationDetails[destinationId] });
        });
    });

    describe('boundary', () => {
        test('UserComponent boundary renders correctly', async () => {
            render(<User />);
            await screen.findByText('User Details');
            expect(screen.getByText('Username:')).toBeTruthy();
            expect(screen.getByText('Email:')).toBeTruthy();
            expect(screen.getByText('Password:')).toBeTruthy();
        });

        test('UserComponent boundary displays user details', async () => {
            render(<User />);
            await screen.findByText('User Details');
            expect(screen.getByDisplayValue(user.username)).toBeTruthy();
            expect(screen.getByDisplayValue(user.email)).toBeTruthy();
            expect(screen.getByDisplayValue(user.password)).toBeTruthy();
        });

        test('UserComponent boundary initially hides trips, bookings, reviews, upcoming trips, and past trips', async () => {
            render(<User />);
            await screen.findByText('User Details');
            expect(screen.queryByText('User\'s Trips')).toBeNull();
            expect(screen.queryByText('User\'s Bookings')).toBeNull();
            expect(screen.queryByText('User\'s Reviews')).toBeNull();
            expect(screen.queryByText('User\'s Upcoming Trips')).toBeNull();
            expect(screen.queryByText('User\'s Past Trips')).toBeNull();
        });

        test('UserComponent boundary can show/hide trips', async () => {
            render(<User />);
            await screen.findByText('User Details');
            const showTripsButton = screen.getByText('Show Trips');
            fireEvent.click(showTripsButton);
            expect(screen.getByText('User\'s Trips')).toBeTruthy();
            expect(screen.getByText('Destination 1 - 2023-09-10 to 2023-09-20')).toBeTruthy();
            const hideTripsButton = screen.getByText('Hide Trips');
            fireEvent.click(hideTripsButton);
            expect(screen.queryByText('User\'s Trips')).toBeNull();
        });

        test('UserComponent boundary can show/hide bookings', async () => {
            render(<User />);
            await screen.findByText('User Details');
            const showBookingsButton = screen.getByText('Show Bookings');
            fireEvent.click(showBookingsButton);
            expect(screen.getByText('User\'s Bookings')).toBeTruthy();
            expect(screen.getByText('Destination 2')).toBeTruthy();
            const hideBookingsButton = screen.getByText('Hide Bookings');
            fireEvent.click(hideBookingsButton);
            expect(screen.queryByText('User\'s Bookings')).toBeNull();
        });

        test('UserComponent boundary can show/hide reviews', async () => {
            render(<User />);
            await screen.findByText('User Details');
            const showReviewsButton = screen.getByText('Show Reviews');
            fireEvent.click(showReviewsButton);
            expect(screen.getByText('User\'s Reviews')).toBeTruthy();
            expect(screen.getByText('Great place!')).toBeTruthy();
            const hideReviewsButton = screen.getByText('Hide Reviews');
            fireEvent.click(hideReviewsButton);
            expect(screen.queryByText('User\'s Reviews')).toBeNull();
        });

        test('UserComponent boundary can show/hide upcoming trips', async () => {
            render(<User />);
            await screen.findByText('User Details');
            const showUpcomingTripsButton = screen.getByText('Show Upcoming Trips');
            fireEvent.click(showUpcomingTripsButton);
            expect(screen.getByText('User\'s Upcoming Trips')).toBeTruthy();
            expect(screen.getByText('Destination 1 - 2023-09-10 to 2023-09-20')).toBeTruthy();
            const hideUpcomingTripsButton = screen.getByText('Hide Upcoming Trips');
            fireEvent.click(hideUpcomingTripsButton);
            expect(screen.queryByText('User\'s Upcoming Trips')).toBeNull();
        });

        test('UserComponent boundary can show/hide past trips', async () => {
            render(<User />);
            await screen.findByText('User Details');
            const showPastTripsButton = screen.getByText('Show Past Trips');
            fireEvent.click(showPastTripsButton);
            expect(screen.getByText('User\'s Past Trips')).toBeTruthy();
            expect(screen.getByText('Destination 1 - 2023-09-10 to 2023-09-20')).toBeTruthy();
            const hidePastTripsButton = screen.getByText('Hide Past Trips');
            fireEvent.click(hidePastTripsButton);
            expect(screen.queryByText('User\'s Past Trips')).toBeNull();
        });
    });
});
