class Stadium {
    constructor(stadiumName, vendors) {
        this.stadiumName = stadiumName;
        this.vendors = vendors;
    }
    addVendor(vendor) {
        this.vendors.push(vendor);
    }
}

class Customer {
    constructor(firstName, lastName, phoneNumber) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    order(vendor, order) {
        vendor.addOrder(order);
    }
}

class FoodItem {
    constructor(name, price, amount) {
        this.name = name;
        this.price = price;
        this.amount = amount;
    }
}

class Order {
    constructor(customer, foodItems) {
        this.customer = customer;
        this.foodItems = foodItems;
    }
    addFood(foodItem) {
        this.foodItems.push(foodItem);
    }
}

class Vendor {
    constructor(vendName, foodItems){
        this.vendName = vendName;
        this.foodItems = foodItems;
        this.orders = [];
    }
    addFood(foodItem) {
        this.foodItems.push(foodItem);
    }

    addOrder(order) {
        this.orders.push(order);
        // start timer
        // notify  customer through twilio
        
    }

}

module.exports = {
    Stadium: Stadium,
    Customer: Customer,
    FoodItem: FoodItem,
    Order: Order,
    Vendor: Vendor
}