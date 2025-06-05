import React from "react";
import TodoList from "./TodoList.jsx";

const Home = () => {
  return (
    <div className="d-flex flex-column min-vh-100 text-center">
      <h1 className="my-4">Mi App de Tareas</h1>
      <TodoList />
    </div>
  );
};

export default Home;
