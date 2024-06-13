import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

// Load environment variables
dotenv.config();

// Set port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// Connect to the database
connectDB();

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API routes
app.use("/api/users", userRoutes);
app.use("/api/users/todos", todoRoutes); // Adjusted to a more common structure

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });
} else {
  // Default route for development
  app.get("/", (req, res) => res.send("Server is ready"));
}

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
