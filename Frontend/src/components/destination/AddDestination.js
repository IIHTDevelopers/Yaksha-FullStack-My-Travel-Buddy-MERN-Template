import React, { useState, useEffect } from 'react';

function AddDestination() {
    const [destination, setDestination] = useState({
        name: '',
        description: '',
        category: '',
        budget: 0,
        imageUrl: '',
        attractions: [],
    });

    return (
        <div>
            <h1>Add Destination</h1>
        </div>
    );
}

export default AddDestination;
