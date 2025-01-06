import mongoose from "mongoose";

const Schema = mongoose.Schema;

const authSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
