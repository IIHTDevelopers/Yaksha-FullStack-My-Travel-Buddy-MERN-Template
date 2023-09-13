import React, { useState, useEffect } from 'react';

const AllReview = () => {
    const [reviews, setReviews] = useState([]);
    const [destinationDetails, setDestinationDetails] = useState({});
    const [searchQuery, setSearchQuery] = useState({
        destinationName: '',
        minRating: '',
        maxRating: '',
    });

    return (
        <div>
            <h1>Reviews</h1>
        </div>
    );
}

export default AllReview;
