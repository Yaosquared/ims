const express = require("express");
const path = require("path");
const placeholderData = require("./data");

const app = express();
// get styles from public/assets folder
app.use("/styles", express.static("styles"));
const mappedData = placeholderData.map((item) => {
  return {
    name: item.name,
    category: item.category,
    quantity: item.quantity,
    price: parseFloat(item.price),
    description: item.description,
  };
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("homePage", { mappedData });
});

app.get("/edit", (req, res) => {
  res.render("editItem", { mappedData });
});

app.get("/add", (req, res) => {
  res.render("addItem", { mappedData });
});

app.get("/delete", (req, res) => {
  res.render("deleteItem", { mappedData });
});

app.get("*", (req, res) => {
  res.send("Page not available");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
