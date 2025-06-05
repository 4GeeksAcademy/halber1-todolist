import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCircleXmark, faThumbsUp } from "@fortawesome/free-solid-svg-icons";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newTodo = {
        id: Date.now(),
        label: newTask,
        is_done: false,
      };
      setTodos([...todos, newTodo]);
      setNewTask("");
    }
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((todo) =>
      todo.id === currentTask.id ? currentTask : todo
    );
    setTodos(updatedTodos);
    setIsEditing(false);
    setCurrentTask({});
  };

  const handleDeleteTask = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const handleToggleCompletion = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, is_done: !todo.is_done } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div>
      <form onSubmit={isEditing ? handleSaveEdit : handleAddTask}>
        <input
          type="text"
          value={isEditing ? currentTask.label : newTask}
          onChange={(e) =>
            isEditing
              ? setCurrentTask({ ...currentTask, label: e.target.value })
              : setNewTask(e.target.value)
          }
          placeholder="Enter task"
        />
        <button type="submit">{isEditing ? "Save" : "Add"}</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              onClick={() => handleToggleCompletion(todo.id)}
              style={{
                textDecoration: todo.is_done ? "line-through" : "none",
              }}
            >
              {todo.is_done ? (
                <FontAwesomeIcon icon={faThumbsUp} />
              ) : (
                <FontAwesomeIcon icon={faCircleXmark} />
              )}
              {todo.label}
            </span>
            <button onClick={() => handleEditTask(todo)}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            <button onClick={() => handleDeleteTask(todo.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
