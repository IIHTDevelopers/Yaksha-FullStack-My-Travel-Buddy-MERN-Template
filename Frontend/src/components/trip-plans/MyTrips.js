import React, { useState, useEffect } from 'react';

const MyTrips = ({ userId }) => {
    const [myTrips, setMyTrips] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});

    return (
        <div>
            <h1>My Trips</h1>
        </div>
    );
}

export default MyTrips;
