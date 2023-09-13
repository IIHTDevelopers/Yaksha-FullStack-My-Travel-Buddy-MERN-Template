import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

function AddReview() {
    const history = useHistory();
    const { id } = useParams();
    const destinationId = id;

    const [review, setReview] = useState({
        user: '64eca3aa636c9fd96a9b2924',
        destination: destinationId,
        rating: 0,
        comment: '',
        helpfulVotes: 0,
    });

    return (
        <div>
            <h1>Add Review</h1>
        </div>
    );
}

export default AddReview;
