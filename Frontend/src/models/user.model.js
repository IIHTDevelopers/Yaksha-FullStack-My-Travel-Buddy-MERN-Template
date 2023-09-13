class User {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.tokens = [];
        this.trips = [];
        this.bookings = [];
        this.reviews = [];
    }
}

export default User;