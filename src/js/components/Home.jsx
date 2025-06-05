import React from "react";
import { TodoList } from "./TodoList";


export const Home = () => {
  return (
    <div className="container">
      <h1>Todo List App</h1>
      <TodoList />
    </div>
  );
};
