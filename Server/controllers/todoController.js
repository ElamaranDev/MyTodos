import asyncHandler from "express-async-handler";
import Todo from "../models/TodoModel.js";

// @desc Create a new todo
// @route POST /api/users/todos
// @access Private
const createTodo = asyncHandler(async (req, res) => {
  const { todo, status, priority } = req.body;

  const newTodo = await Todo.create({
    todo,
    status,
    priority,
    userId: req.user._id, // Assuming req.user contains the authenticated user's info
  });

  res.status(201).json(newTodo);
});

// @desc Get all todos for the authenticated user
// @route GET /api/users/todos
// @access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ userId: req.user._id });
  res.status(200).json(todos);
});

// @desc Get a single todo by ID
// @route GET /api/users/todos/:id
// @access Private
const getTodoById = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo && todo.userId.toString() === req.user._id.toString()) {
    res.status(200).json(todo);
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

// @desc Update a todo
// @route PUT /api/users/todos/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  const { todo, status, priority } = req.body;

  const existingTodo = await Todo.findById(req.params.id);

  if (
    existingTodo &&
    existingTodo.userId.toString() === req.user._id.toString()
  ) {
    existingTodo.todo = todo || existingTodo.todo;
    existingTodo.status = status !== undefined ? status : existingTodo.status;
    existingTodo.priority = priority || existingTodo.priority;

    const updatedTodo = await existingTodo.save();
    res.status(200).json(updatedTodo);
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

// @desc Delete a todo
// @route DELETE /api/users/todos/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (todo && todo.userId.toString() === req.user._id.toString()) {
    await todo.deleteOne();
    res.status(200).json({ message: "Todo removed" });
  } else {
    res.status(404);
    throw new Error("Todo not found");
  }
});

export { createTodo, getTodos, getTodoById, updateTodo, deleteTodo };
