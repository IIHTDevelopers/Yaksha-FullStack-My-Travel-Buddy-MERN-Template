class UserService {
    async createUser(userData) { }
    async getUserByEmail(email) { }
    async getUser(userId) { }
    async updateUser(userId, updatedUser) { }
    async deleteUser(userId) { }
    async getUpcomingTrips(userId) { }
    async getPastTrips(userId) { }
    async getTripPlans(userId) { }
    async getUserBookings(userId) { }
    async getUserReviews(userId) { }
}

module.exports = UserService;