import mongoose from "mongoose";
import Item from "../models/item";

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
