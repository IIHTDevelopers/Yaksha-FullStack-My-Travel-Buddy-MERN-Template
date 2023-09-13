class TripPlanService {
    async createTripPlan(tripPlanData) { }
    async getTripPlan(tripPlanId) { }
    async updateTripPlan(tripPlanId, updatedTripPlan) { }
    async deleteTripPlan(tripPlanId) { }
    async searchTripPlansByDestination(destinationName) { }
    async searchTripPlansByBudgetRange(minBudget, maxBudget) { }
    async getAllTripPlans() { }
    async getTripPlansByUser(userId) { }
    async getPopularTripPlans() { }
}

module.exports = TripPlanService;