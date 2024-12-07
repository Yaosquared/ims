const { v4: uuidv4 } = require("uuid");

let placeholderData = [
  {
    id: uuidv4(),
    name: "Sample Item 1",
    category: "Electronics",
    quantity: 10,
    price: "150.00",
    description: "A sample electronic item 1",
  },
  {
    id: uuidv4(),
    name: "Sample Item 2",
    category: "Electronics",
    quantity: 15,
    price: "150.13",
    description: "A sample electronic item 2",
  },
  {
    id: uuidv4(),
    name: "Sample Item 3",
    category: "Electronics",
    quantity: 15,
    price: "150.45",
    description: "A sample electronic item 3",
  },
];

module.exports = placeholderData;
