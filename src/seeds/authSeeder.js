import mongoose from "mongoose";
import Auth from "../models/auth";

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
  const items = new Auth({
    username: "testUsername",
    password: "testPassword",
    token: "testToken",
  });
  await items.save();
  console.log("Data inserted!");
};

seedDb.apply().then(() => {
  console.log("Connection Closed");
  mongoose.connection.close();
});
