import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import itemRoutes from "./server/routes/itemRoutes.js";

const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
