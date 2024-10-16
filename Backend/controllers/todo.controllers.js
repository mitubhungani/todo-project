const Todo = require("../model/todo.model");

const getTodo = async (req, res) => {
  let data = await Todo.find();
  res.send(data);
};

const addTodo = async (req, res) => {
  let data = await Todo.create(req.body);
  res.send(data);
};

const deleteTodo = async (req, res) => {
  let { id } = req.params;
  let data = await Todo.findByIdAndDelete(id);
  res.send(data);
};

const updateTodo = async (req, res) => {
  let { id } = req.params;
  let data = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.send(data);
};

module.exports = { getTodo, addTodo, deleteTodo, updateTodo };
