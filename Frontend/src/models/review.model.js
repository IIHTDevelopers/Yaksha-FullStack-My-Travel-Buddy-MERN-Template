class Review {
    constructor(user, destination, rating, comment, helpfulVotes) {
        this.user = user;
        this.destination = destination;
        this.rating = rating;
        this.comment = comment || '';
        this.helpfulVotes = helpfulVotes || 0;
    }
}

export default Review;