import React, { useState } from "react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;
    setTodos([...todos, { label: task, is_done: false }]);
    setTask("");
  };

  const handleDelete = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="container my-4">
      <h2>Todo List</h2>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
      <ul className="list-group my-3">
        {todos.length === 0 ? (
          <li className="list-group-item">No tasks yet.</li>
        ) : (
          todos.map((item, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center hidden-icon"
            >
              {item.label}
              <span onClick={() => handleDelete(index)} className="text-danger">
                🗑️
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TodoList;
