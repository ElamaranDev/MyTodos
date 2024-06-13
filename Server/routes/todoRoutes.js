import express from "express";
import {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Route to create a new todo and get all todos for the authenticated user
router
  .route("/")
  .post(protect, createTodo) // Create a new todo
  .get(protect, getTodos); // Get all todos for the authenticated user

// Routes to get, update, and delete a specific todo by ID
router
  .route("/:id")
  .get(protect, getTodoById) // Get a specific todo by ID
  .put(protect, updateTodo) // Update a specific todo by ID
  .delete(protect, deleteTodo); // Delete a specific todo by ID

export default router;
