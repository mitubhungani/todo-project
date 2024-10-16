const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  task: String,
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = Todo;
