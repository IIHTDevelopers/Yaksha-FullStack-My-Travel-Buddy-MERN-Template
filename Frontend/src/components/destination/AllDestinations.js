import React, { useState, useEffect } from 'react';

function AllDestination() {
    const [allDestinations, setAllDestinations] = useState([]);
    const [searchQuery, setSearchQuery] = useState({
        name: '',
        category: '',
        minBudget: '',
        maxBudget: '',
    });

    return (
        <div>
            <h1>All Destinations</h1>
        </div >
    );
}

export default AllDestination;
