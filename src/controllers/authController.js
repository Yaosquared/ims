import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Auth from "../models/auth.js";

const hashedPassword = async (password) => {
  const result = await bcryptjs.hash(password, 10);
  return result;
};

const compare = async (password, hashedPassword) => {
  const result = await bcryptjs.compare(password, hashedPassword);
  return result;
};

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

// Display sign in form
const signInForm = (req, res) => {
  res.status(200).render("signin");
};

// Sign in with existing credentials
const signIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await Auth.findOne({ username: username });

  if (!user) {
    return res
      .status(403)
      .json({ error: "User does not exist. Please sign up to continue." });
  }

  const passwordVerification = await compare(password, user.password);
  if (!passwordVerification) {
    return res
      .status(403)
      .json({ error: "Invalid password. Please try again." });
  }
  console.log(passwordVerification);

  const userObject = user.toObject();

  const token = jwt.sign(
    { id: userObject._id, username: userObject.username },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.cookie("token", token, {
    maxAge: 600000, // available for only 10mins.
    httpOnly: true,
  });

  res.status(200).redirect("/items");
};

// Display register form
const signUpForm = (_req, res) => {
  res.status(200).render("signup");
};

// Register new user
const signUp = async (req, res) => {
  try {
    const userExists = await Auth.findOne({ username: req.body.username });

    if (userExists) {
      res.status(409).json({ error: "User already exists" });
    } else {
      const token = jwt.sign(
        { username: req.body.name },
        process.env.JWT_SECRET
      );

      res.cookie("token", token, {
        maxAge: 600000, // available for only 10mins.
        httpOnly: true,
      });

      const data = {
        username: req.body.username,
        password: await hashedPassword(req.body.password),
        token: token,
      };

      await Auth.insertMany([data]);

      res.status(201).redirect("/");
    }
  } catch {
    res.status(500).send("Unexpected error. Please try again.");
  }
};

const signOut = (_req, res) => {
  res.clearCookie("token");
  res.status(200).redirect("/");
};

export default {
  signUpForm,
  signUp,
  signIn,
  signInForm,
  signOut,
};
