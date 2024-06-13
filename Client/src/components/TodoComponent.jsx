/* eslint-disable react/prop-types */
import {
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
} from "../slices/todoSlice.js";

const TodoComponent = ({ todo, onStatusChange, setTodoToEdit, setTodos }) => {
  const [updateTodoMutation] = useUpdateTodoMutation();
  const [deleteToDo] = useDeleteTodoMutation();
  const { data: todos } = useGetTodosQuery();

  const updateTodo = async (id, currentStatus) => {
    try {
      await updateTodoMutation({
        id,
        updatedTodo: { status: !currentStatus },
      }).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await deleteToDo(id).unwrap();
      const updatedTodos = todos.filter((todo) => todo._id !== id);
      setTodos(updatedTodos);
      console.log("Todo deleted successfully");
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleStatusClick = () => {
    onStatusChange(todo._id, !todo.status);
    updateTodo(todo._id, todo.status);
  };

  return (
    <>
      <div className="todo" key={todo._id}>
        <button onClick={handleStatusClick} className="status-btn">
          <img
            id="status-btn-icon"
            src={todo.status ? "/icons/check.png" : "/icons/uncheck.png"}
            alt={todo.status ? "Checked" : "Unchecked"}
          />
        </button>
        <p id="todo-name">
          {!todo.status ? (
            todo.todo
          ) : (
            <span style={{ color: todo.status ? "#b4b4b4" : "inherit" }}>
              <strike>{todo.todo}</strike>
            </span>
          )}
        </p>
        <button
          onClick={() => {
            setTodoToEdit(todo);
          }}
          className="edit-btn"
        >
          <img id="edit-btn-img" src="/icons/edit_icon_blue.png" alt="Edit" />
        </button>
        <button
          onClick={() => {
            handleDeleteTodo(todo._id);
          }}
          className="delete-btn"
        >
          <img
            id="delete-btn-img"
            src="/icons/delete_icon_black.png"
            alt="Delete"
          />
        </button>
      </div>
    </>
  );
};

export default TodoComponent;
