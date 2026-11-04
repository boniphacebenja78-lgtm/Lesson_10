// Initial Arrays
const foods = ["Jollof Rice", "Waakye", "Kelewele"];
const drinks = ["Sobolo", "Asaana"];

// ==========================================
// STEP 1: Arrays
// ==========================================

// Push "Red Red" onto foods, then pop it off again
foods.push("Red Red");
foods.pop();

// Concatenate the two arrays, sort alphabetically, and reverse
const menu = foods.concat(drinks).sort().reverse();

// Show concatenated menu in the element with id "menu" using join(", ")
document.getElementById("menu").textContent = "Menu: " + menu.join(", ");

// Log the indexOf "Sobolo" in the menu
console.log("Index of Sobolo:", menu.indexOf("Sobolo"));

// Use forEach to log each item on the menu
console.log("--- Menu Items ---");
menu.forEach(item => console.log(item));

// ==========================================
// STEP 2: Associative arrays and objects
// ==========================================

const stock = {
  "Waakye": 8,
  "Sobolo": 15,
  "Kelewele": 12,
  "Jollof Rice": 10,
  "Asaana": 6
};

// Display stock in the element with id "stock"
let stockText = "Stock: ";
for (const dish in stock) {
  stockText += `${dish}: ${stock[dish]} plates | `;
}
document.getElementById("stock").textContent = stockText.slice(0, -3);

// ==========================================
// STEP 3: Multidimensional arrays
// ==========================================

// Order format: [name, price, qty]
const order = [
  ["Jollof Rice", 35, 2],
  ["Sobolo", 10, 3]
];

// Log the price of the second line using two indexes
console.log("Price of second line (Sobolo):", order[1][1]);

// Use 'some' to check whether any line has quantity > 2 and log the result
const hasQtyGreaterThanTwo = order.some(line => line[2] > 2);
console.log("Any line quantity > 2?", hasQtyGreaterThanTwo);

// ==========================================
// STEP 4: Functions
// ==========================================

function lineCost(price, qty) {
  return price * qty;
}

function orderLines(orderArray) {
  return orderArray.map(line => {
    const [name, price, qty] = line;
    const cost = lineCost(price, qty);
    return `${qty} x ${name} - GHS ${cost}`;
  });
}

// Call orderLines and append each line to the <ul> with id "order"
const lines = orderLines(order);
const orderUl = document.getElementById("order");

lines.forEach(lineText => {
  const li = document.createElement("li");
  li.textContent = lineText;
  orderUl.appendChild(li);
});

// ==========================================
// STEP 5: Constructor functions and prototypes
// ==========================================

function Dish(name, price) {
  this.name = name;
  this.price = price;
}

// Add describe method to prototype
Dish.prototype.describe = function () {
  return `${this.name} - GHS ${this.price}`;
};

// Create instances and log describe()
const jollof = new Dish("Jollof Rice", 35);
const sobolo = new Dish("Sobolo", 10);

console.log(jollof.describe());
console.log(sobolo.describe());

/*
  WHY PROTOTYPE SAVES MEMORY:
  Defining a method directly inside the constructor function creates a new copy of that 
  function in memory for every single instance created. 
  By placing the method on Dish.prototype, all instances share a single reference 
  to that method in memory, reducing memory overhead as the application scales.
*/

// ==========================================
// STEP 6: Classes and method chaining
// ==========================================

class Order {
  constructor() {
    this.lines = [];
  }

  add(dish, qty) {
    this.lines.push({ dish, qty });
    return this; // Enables method chaining
  }

  total() {
    return this.lines.reduce((sum, line) => sum + (line.dish.price * line.qty), 0);
  }
}

// Build customer order using method chaining and update DOM
const customerOrder = new Order().add(jollof, 2).add(sobolo, 3);
const grandTotal = customerOrder.total().toFixed(2);

document.getElementById("total").textContent = `Total: GHS ${grandTotal}`;