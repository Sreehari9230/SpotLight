import express from "express";
import mongoose from "mongoose";
// import dotenv from "dotenv";
import "dotenv/config";

import cors from "cors";
import moviesRoutes from "./routes/movies.route.js";

// dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://spot-light-12-2025.netlify.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// https://spot-light-12-2025.netlify.app/
// http://localhost:5173

app.use(express.json());

// Routes
app.use("/api/movies", moviesRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend running with controllers!");
});

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI) 
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
