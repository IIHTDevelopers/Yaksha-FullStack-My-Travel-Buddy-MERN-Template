import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const UpdateReview = () => {
    const history = useHistory();
    const { id } = useParams();

    const [review, setReview] = useState({
        user: '',
        destination: '',
        rating: 0,
        comment: '',
        helpfulVotes: 0,
    });

    return (
        <div>
            <h1>Edit Review</h1>
        </div>
    );
}

export default UpdateReview;
