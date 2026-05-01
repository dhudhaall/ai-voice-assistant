import app from "./app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"));

app.listen(5000, () => console.log("Server running on 5000"));