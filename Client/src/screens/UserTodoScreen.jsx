import { useEffect, useState } from "react";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useGetTodoByIdQuery,
} from "../slices/todoSlice";
import PriorityDropdown from "../components/PriorityDropdown";
import DropdownMenu from "../components/DropdownMenu";
import TodoComponent from "../components/TodoComponent";
import { useSelector } from "react-redux";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";

export default function UserTodoScreen() {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState({});
  const [selectedOption, setSelectedOption] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("urgent");
  const [content, setContent] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  // Conditionally fetch todos only if userInfo is available
  const {
    data: userTodos,
    isLoading,
    error,
    refetch,
  } = useGetTodosQuery(undefined, {
    skip: !userInfo,
  });

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();

  const { data: singleTodo } = useGetTodoByIdQuery(editTodo._id, {
    skip: !editTodo?._id,
  });

  useEffect(() => {
    if (userInfo) {
      refetch();
    } else {
      // Clear todos and other states when userInfo changes to null (logout)
      setTodos([]);
      setEditTodo({});
      setContent("");
    }
  }, [userInfo, refetch]);

  useEffect(() => {
    if (userTodos) {
      setTodos(userTodos);
    }
    if (error) {
      console.log("Error:", error.message);
    }
  }, [userTodos, isLoading, error]);

  useEffect(() => {
    if (singleTodo) {
      setContent(singleTodo.todo);
    }
  }, [singleTodo]);

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (editTodo._id) {
      try {
        const updatedTodo = { ...editTodo, todo: content };
        setTodos(
          todos.map((todo) => (todo._id === editTodo._id ? updatedTodo : todo))
        );
        await updateTodo({
          id: editTodo._id,
          updatedTodo: { todo: content, status: editTodo.status },
        }).unwrap();
        setEditTodo({});
        setContent("");
        toast.success("Todo updated!");
      } catch (error) {
        toast.error("Error updating Todo");
      }
    } else {
      if (content.length > 3) {
        const newTodo = {
          todo: content,
          priority: selectedPriority,
          status: false,
        };
        setTodos([...todos, newTodo]);
        setContent("");
        try {
          await addTodo(newTodo).unwrap();
          setContent("");
          console.log("Todo added successfully");
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      }
    }
  };

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos(
      todos.map((todo) =>
        todo._id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  const newTodos = todos.filter((todo) => {
    if (selectedOption === "all") {
      return true;
    } else {
      return todo.priority === selectedOption;
    }
  });

  const setTodoToEdit = (todo) => {
    const todo_name = todo.todo;
    setContent(todo_name);
    setEditTodo(todo);
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <main className="container todo-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="title">MyTodos</h1>
          <form className="todo-input" onSubmit={createNewTodo}>
            <input
              type="text"
              value={content}
              placeholder="Enter a new ToDo.."
              className="todo-input-field"
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <PriorityDropdown
              selectedPriority={selectedPriority}
              onPriorityChange={handlePriorityChange}
            />
            <button type="submit" className="add-btn">
              ADD
            </button>
          </form>
          <DropdownMenu
            selectedOption={selectedOption}
            onOptionChange={handleOptionChange}
          />
          <div className="todos">
            {newTodos.length > 0
              ? newTodos.map((todo) => (
                  <TodoComponent
                    key={todo._id}
                    todo={todo}
                    setTodoToEdit={setTodoToEdit}
                    onStatusChange={handleStatusChange}
                    setTodos={setTodos}
                  />
                ))
              : !isLoading && (
                  <div className="no-todo-msg">
                    Great things start with a single step. Add your first ToDo!
                  </div>
                )}
          </div>
        </>
      )}
    </main>
  );
}
