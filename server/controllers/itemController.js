const mongoose = require("mongoose");
const Item = require("../../models/item");
const dotenv = require("dotenv");
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connection Success");
  })
  .catch((err) => {
    console.log("Connection Error");
    console.log(err);
  });

// Display all items
exports.items = async (req, res) => {
  const items = await Item.find();
  res.render("home", { items });
};

// Add item form
exports.addItemForm = (req, res) => {
  res.render("new");
};

// Create item record
exports.addItem = async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.redirect("/items");
};

// View item details
exports.viewItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("details", { item });
};

// Update user form
exports.editItemForm = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("edit", { item });
};

// Update item
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/items/${id}`);
};

// Display delete confirmation modal/page
exports.deleteItemModal = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("delete", { item });
};

// Delete item
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.redirect("/items");
};
