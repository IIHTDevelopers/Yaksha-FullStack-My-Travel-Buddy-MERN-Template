import React, { useState, useEffect } from 'react';

function User() {
    const [user, setUser] = useState(null);
    const [showTrips, setShowTrips] = useState(false);
    const [showBookings, setShowBookings] = useState(false);
    const [showReviews, setShowReviews] = useState(false);
    const [showUpcomingTrips, setShowUpcomingTrips] = useState(false);
    const [showPastTrips, setShowPastTrips] = useState(false);
    const [trips, setTrips] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [pastTrips, setPastTrips] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});

    return (
        <div>
            <h1>User Details</h1>
        </div>
    );
}

export default User;
