class TripPlan {
    constructor(destination, user, startDate, endDate, activities, accommodations) {
        this.destination = destination;
        this.user = user;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activities = activities || [];
        this.accommodations = accommodations || {};
    }
}

export default TripPlan;