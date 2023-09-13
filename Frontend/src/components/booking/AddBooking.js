import React, { useState, useEffect } from 'react';

function AddBooking() {

    const [booking, setBooking] = useState({
        user: '',
        destination: '',
        date: '',
        status: '',
        flightDetails: '',
        accommodationDetails: '',
    });

    const [destinationList, setDestinationList] = useState([]);

    return (
        <div>
            <h1>Add Booking</h1>
        </div>
    );
}

export default AddBooking;
