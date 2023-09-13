class Booking {
    constructor(user, destination, date, status, flightDetails, accommodationDetails) {
        this.user = user;
        this.destination = destination;
        this.date = date;
        this.status = status || '';
        this.flightDetails = flightDetails || {};
        this.accommodationDetails = accommodationDetails || {};
    }
}

export default Booking;