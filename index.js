const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

const app = express();
const placeholderData = require("./data");

// Get static files from local directories
app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));

// Parse any data from form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// Display form to add new item
app.get("/inventory/new", (req, res) => {
  res.render("inventory/new");
});

// Create new item
app.post("/inventory", (req, res) => {
  const { name, category, quantity, price, description } = req.body;
  placeholderData.push({
    id: uuidv4(),
    name,
    category,
    quantity,
    price,
    description,
  });
  res.redirect("/inventory");
});

// Display specific details of item
app.get("/inventory/:id", (req, res) => {
  const { id } = req.params;
  const itemDetails = placeholderData.find((item) => item.id === id);
  res.render("inventory/details", { itemDetails });
});

// Display edit form with exisintg data mapped to it
app.get("/inventory/:id/edit", (req, res) => {
  const { id } = req.params;
  const itemDetails = placeholderData.find((item) => item.id === id);
  res.render("inventory/edit", { itemDetails });
});

// Display form to update item
app.patch("/inventory/:id", (req, res) => {
  const { id } = req.params;
  const { name, category, quantity, price, description } = req.body;
  const itemIndex = placeholderData.findIndex((item) => item.id === id);
  placeholderData[itemIndex] = {
    id,
    name,
    category,
    quantity,
    price,
    description,
  };
  res.redirect("/inventory");
});

// Display all data in tabular format
app.get("/inventory", (req, res) => {
  res.render("inventory/home", { placeholderData });
});

// Display confirmation for delete modal
app.get("/inventory/:id/delete", (req, res) => {
  const { id } = req.params;
  itemToDelete = placeholderData.find((item) => item.id === id);
  // console.log(itemToDelete);
  res.render("inventory/delete", { itemToDelete });
});

// Delete an item
app.delete("/inventory/:id", (req, res) => {
  const { id } = req.params;
  itemIndex = placeholderData.findIndex((item) => item.id === id);
  // console.log(itemIndex);
  placeholderData.splice(itemIndex, 1);
  res.redirect("/inventory");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
