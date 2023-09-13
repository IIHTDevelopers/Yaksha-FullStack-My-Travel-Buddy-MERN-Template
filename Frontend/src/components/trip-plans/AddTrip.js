import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const AddTrip = () => {
    const history = useHistory();
    const { id } = useParams();
    const [trip, setTrip] = useState({
        destination: '',
        startDate: '',
        endDate: '',
        activities: [''],
        accommodations: {
            hotel: '',
            checkInDate: '',
            checkOutDate: '',
        },
    });
    const [destinationDetails, setDestinationDetails] = useState({});
    const [destinationOptions, setDestinationOptions] = useState([]);

    return (
        <div>
            <h1>Add Trip</h1>
        </div>
    );
}

export default AddTrip;
