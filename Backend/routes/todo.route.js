const { Router } = require("express");
const {
  getTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todo.controllers");
const isValid = require("../middlewares/todo.validation");

const todoRoute = Router();

todoRoute.get("/todo", getTodo);

todoRoute.post("/todo", isValid, addTodo);

todoRoute.delete("/todo/:id", deleteTodo);

todoRoute.patch("/todo/:id", updateTodo);

module.exports = todoRoute;
