import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["urgent", "important", "negligible"],
      default: "urgent",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
