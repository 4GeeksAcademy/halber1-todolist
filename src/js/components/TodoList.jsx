import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faCircleXmark, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

export const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, label: "Comprar leche", is_done: false },
    { id: 2, label: "Estudiar React", is_done: true },
  ]);
  const [newTask, setNewTask] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  // Añadir nueva tarea
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    const newTodo = {
      id: Date.now(),
      label: newTask.trim(),
      is_done: false
    };
    setTodos([...todos, newTodo]);
    setNewTask("");
  };

  // Editar tarea existente
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTodos(todos.map(todo => 
      todo.id === editTodoId 
        ? { ...todo, label: editTask, is_done: editCompleted } 
        : todo
    ));
    setIsEdit(false);
    setEditTask("");
    setEditCompleted(false);
    setEditTodoId(null);
  };

  // Cargar tarea para editar
  const handleEdit = (todo) => {
    setIsEdit(true);
    setEditTask(todo.label);
    setEditCompleted(todo.is_done);
    setEditTodoId(todo.id);
  };

  // Eliminar tarea
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Cancelar edición
  const handleCancel = () => {
    setIsEdit(false);
    setEditTask("");
    setEditCompleted(false);
    setEditTodoId(null);
  };

  return (
    <div className="container my-5">
      <h1 className="text-success">Todo List</h1>

      {isEdit ? (
        <form onSubmit={handleEditSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label">Edit Task</label>
            <input 
              type="text" 
              className="form-control" 
              value={editTask} 
              onChange={(e) => setEditTask(e.target.value)} 
              required
            />
          </div>
          <div className="mb-3 form-check text-start">
            <input 
              type="checkbox" 
              className="form-check-input" 
              checked={editCompleted} 
              onChange={(e) => setEditCompleted(e.target.checked)} 
            />
            <label className="form-check-label">Completed</label>
          </div>
          <button type="submit" className="btn btn-primary me-2">Submit</button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
        </form>
      ) : (
        <form onSubmit={handleAddTask}>
          <div className="mb-3 text-start">
            <label className="form-label">Add Task</label>
            <input 
              type="text" 
              className="form-control" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder="Write a new task..." 
              required
            />
          </div>
          <button type="submit" className="btn btn-success">Add Task</button>
        </form>
      )}

      <h2 className="text-primary mt-5">List</h2>

      <ul className="list-group text-start">
        {todos.length === 0 && <li className="list-group-item">No tasks, please add a new task</li>}
        {todos.map(todo => (
          <li 
            key={todo.id} 
            className="list-group-item hidden-icon d-flex justify-content-between align-items-center"
          >
            <div className={todo.is_done ? "completed-task" : ""}>
              {todo.is_done 
                ? <FontAwesomeIcon icon={faThumbsUp} className="text-success me-2" />
                : <FontAwesomeIcon icon={faCircleXmark} className="text-danger me-2" />
              }
              {todo.label}
            </div>
            <div>
              <span onClick={() => handleEdit(todo)}>
                <FontAwesomeIcon icon={faPenToSquare} className="me-3 text-primary" style={{cursor: 'pointer'}} />
              </span>
              <span onClick={() => handleDelete(todo.id)}>
                <FontAwesomeIcon icon={faTrash} className="text-danger" style={{cursor: 'pointer'}} />
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className="big-counter mt-4">
        <div>{todos.length}</div>
      </div>
    </div>
  );
};
