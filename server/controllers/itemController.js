import mongoose from "mongoose";
import Item from "../../models/item.js";

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
// const items = async (req, res) => {
//   const searchData = req.query.key || "";
//   const items = await Item.find({
//     $or: [{ name: { $regex: searchData, $options: "i" } }],
//   });
//   res.render("home", { items, searchData });
// };

//==
const items = async (req, res) => {
  const searchData = req.query.key || "";
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 10;
  const skip = (page - 1) * limit;
  const query = Item.find({
    $or: [{ name: { $regex: searchData, $options: "i" } }],
  })
    .skip(skip)
    .limit(limit);
  const items = await query;
  res.render("home", {
    items,
    searchData,
    currentPage: page,
    totalPages: Math.ceil(
      (await Item.countDocuments({
        $or: [{ name: { $regex: searchData, $options: "i" } }],
      })) / limit
    ),
  });
};
//==

// Add item form
const addItemForm = (req, res) => {
  res.render("new");
};

// Create item record
const addItem = async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.redirect("/items");
};

// View item details
const viewItem = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("details", { item });
};

// Update user form
const editItemForm = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("edit", { item });
};

// Update item
const updateItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByIdAndUpdate(id, { ...req.body });
  res.redirect(`/items/${id}`);
};

// Display delete confirmation modal/
const deleteItemModal = async (req, res) => {
  const item = await Item.findById(req.params.id);
  res.render("delete", { item });
};

// Delete item
const deleteItem = async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.redirect("/items");
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
