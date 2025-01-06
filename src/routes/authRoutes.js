import express from "express";
import authController from "../controllers/authController.js";

const router = express.Router();

router.get("/", authController.signInForm);
router.post("/signin", authController.signIn);

router.get("/signup", authController.signUpForm);
router.post("/signup", authController.signUp);

router.post("/signout", authController.signOut);

export default router;
