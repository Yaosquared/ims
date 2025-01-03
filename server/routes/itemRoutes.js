import express from "express";
import itemController from "../controllers/itemController.js";

const router = express.Router();

router.get("/", itemController.items);

router.get("/search", itemController.items);

router.get("/new", itemController.addItemForm);
router.post("/create-item", itemController.addItem);

router.get("/:id", itemController.viewItem);

router.get("/:id/edit", itemController.editItemForm);
router.put("/:id", itemController.updateItem);

router.get("/:id/delete", itemController.deleteItemModal);
router.delete("/:id", itemController.deleteItem);

export default router;
