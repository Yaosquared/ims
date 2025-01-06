import mongoose from "mongoose";
import Item from "../models/item.js";

// Database connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error");
    console.log(err);
  });

// Display all items, search for specific item, and limit display per page
const items = async (req, res) => {
  const searchValue = req.query.search || "";
  const pageValue = parseInt(req.query.page) || 1;
  // console.log(`Page: ${pageValue}`);
  const limitValue = parseInt(req.query.limit) || 10;
  // console.log(`Limit: ${limitValue}`);
  const skipValue = (pageValue - 1) * limitValue;
  // console.log(`Skip: ${skipValue}`);
  const query = Item.find({
    $or: [{ name: { $regex: searchValue, $options: "i" } }],
  })
    .skip(skipValue)
    .limit(limitValue);
  const items = await query;
  res.status(200).render("home", {
    items,
    searchValue,
    currentPage: pageValue,
    totalPages: Math.ceil(
      (await Item.countDocuments({
        $or: [{ name: { $regex: searchValue, $options: "i" } }],
      })) / limitValue
    ),
  });
};

// Display add item form
const addItemForm = (_req, res) => {
  res.status(200).render("new");
};

// Create item record
const addItem = async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).redirect("/items");
};

// View item details
const viewItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.status(200).render("details", { item });
};

// Update user form
const editItemForm = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.status(200).render("edit", { item });
};

// Update item
const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, { ...req.body });
  res.status(200).redirect(`/items/${id}`);
};

// Display delete confirmation modal/
const deleteItemModal = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.status(200).render("delete", { item });
};

// Delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.status(200).redirect("/items");
};

export default {
  items,
  addItemForm,
  addItem,
  viewItem,
  editItemForm,
  updateItem,
  deleteItemModal,
  deleteItem,
};
