import React, { useState, useEffect } from 'react';

const AllBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState({
        destinationName: '',
        status: '',
    });

    return (
        <div>
            <h1>Bookings</h1>
        </div>
    );
}

export default AllBooking;
