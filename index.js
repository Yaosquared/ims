const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const itemRoutes = require("./server/routes/itemRoutes");

const app = express();

// Get static files from local directories
app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));

// Parse any data from form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  res.render("landing-page");
});

// Execute routes
app.use("/items", itemRoutes);

app.use("/items", (req, res) => {
  res.render("new");
});

app.listen(3000, () => {
  console.log("App listening on port 3000...");
});
