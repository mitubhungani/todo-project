const express = require("express");
const connectDB = require("./config/db.js");
const todoRoute = require("./routes/todo.route.js");
const cors=require("cors");

const app = express();

app.use(express.json());
app.use(cors())

app.use("/", todoRoute);

app.listen(8090, () => {
  console.log("Server is running on port 8090");
  connectDB();
});