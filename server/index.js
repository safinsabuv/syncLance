import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cors from "cors";

const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("MERN backend is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
