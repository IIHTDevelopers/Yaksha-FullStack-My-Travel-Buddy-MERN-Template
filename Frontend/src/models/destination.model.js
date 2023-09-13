class Destination {
    constructor(name, description, category, budget, imageUrl, attractions) {
        this.name = name;
        this.description = description || '';
        this.category = category || '';
        this.budget = budget || 0;
        this.imageUrl = imageUrl || '';
        this.attractions = attractions || [];
        this.reviews = [];
    }
}

export default Destination;