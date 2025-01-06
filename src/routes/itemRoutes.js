import express from "express";
import itemController from "../controllers/itemController.js";
import jwtCookie from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", jwtCookie, itemController.items);

router.get("/new", jwtCookie, itemController.addItemForm);
router.post("/create-item", jwtCookie, itemController.addItem);

router.get("/:id", jwtCookie, itemController.viewItem);

router.get("/:id/edit", jwtCookie, itemController.editItemForm);
router.put("/:id", jwtCookie, itemController.updateItem);

router.get("/:id/delete", jwtCookie, itemController.deleteItemModal);
router.delete("/:id", jwtCookie, itemController.deleteItem);

export default router;
