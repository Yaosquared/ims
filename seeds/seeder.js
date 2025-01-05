const mongoose = require("mongoose");
const Item = require("../models/item");

// Database connection
mongoose
  .connect(process.env.MONGODB_LOCAL)
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log("Connection Error");
    console.log(err);
  });

const seedDb = async () => {
  //   const items = new Item({
  //     name: "Sample Item 1",
  //     category: "Electronics",
  //     quantity: 10,
  //     price: 150,
  //     description: "A sample electronic item 1",
  //   });
  //   const items = new Item({
  //     name: "Sample Item 2",
  //     category: "Electronics",
  //     quantity: 15,
  //     price: 150.13,
  //     description: "A sample electronic item 2",
  //   });
  const items = new Item({
    name: "Sample Item 3",
    category: "Electronics",
    quantity: 10,
    price: 150.45,
    description: "A sample electronic item 3",
  });
  await items.save();
  console.log("Data inserted!");
};

seedDb.apply().then(() => {
  console.log("Connection Closed");
  mongoose.connection.close();
});
