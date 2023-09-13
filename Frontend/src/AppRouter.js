import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Destination from './components/destination/Destination';
import Homepage from './components/homepage/Homepage';
import AddDestination from './components/destination/AddDestination';
import AllDestination from './components/destination/AllDestinations';
import Login from './components/login/Login';
import Review from './components/review/Review';
import AddReview from './components/review/AddReview';
import AllReview from './components/review/AllReview';
import UpdateReview from './components/review/UpdateReview';
import Booking from './components/booking/Booking';
import AllBooking from './components/booking/AllBooking';
import AddBooking from './components/booking/AddBooking';
import UpcomingBooking from './components/booking/UpcomingBooking';
import Trip from './components/trip-plans/Trip';
import MyTrips from './components/trip-plans/MyTrips';
import PopularTrips from './components/trip-plans/PopularTrips';
import AllTrips from './components/trip-plans/AllTrips';
import AddTrip from './components/trip-plans/AddTrip';
import User from './components/user/User';

function AppRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/destination/add/:id" component={AddDestination} />
                <Route path="/destination/all" component={AllDestination} />
                <Route path="/destination" component={Destination} />
                <Route path="/review/update/:id" component={UpdateReview} />
                <Route path="/review/add/:id" component={AddReview} />
                <Route path="/review/all" component={AllReview} />
                <Route path="/review" component={Review} />
                <Route path="/booking/upcoming" component={UpcomingBooking} />
                <Route path="/booking/add" component={AddBooking} />
                <Route path="/booking/all" component={AllBooking} />
                <Route path="/booking" component={Booking} />
                <Route path="/trips/add/:id" component={AddTrip} />
                <Route path="/trips/all/:id" component={AllTrips} />
                <Route path="/trips/popular" component={PopularTrips} />
                <Route path="/trips/me" component={MyTrips} />
                <Route path="/trips" component={Trip} />
                <Route path="/user" component={User} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Homepage} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default AppRouter;
