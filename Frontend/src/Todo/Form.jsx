import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [task, setTask] = useState("");
  const [alltask, setAllTask] = useState([]);

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(null);
  const [completed, setCompleted] = useState(false);

  const getData = async () => {
    try {
      let res = await axios.get("http://localhost:8090/todo");
      setAllTask(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postData = async (task) => {
    try {
      let res = await axios.post("http://localhost:8090/todo", task);
      console.log(res.data);
      setAllTask([...alltask, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/todo/${id}`);
      console.log(`Deleted ${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async (task) => {
    try {
      let res = await axios.patch(
        `http://localhost:8090/todo/${task.id}`,
        task
      );
      console.log(`updated`, res);
      getData();
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (ele) => {
    try {
      let updatedTask = { ...ele, completed: true };
      await axios.patch(`http://localhost:8090/todo/${ele._id}`, updatedTask);
      console.log(`Task marked as completed`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tasks = {
      task,
      id,
      completed,
    };
    if (edit) {
      updateData(tasks);
      setEdit(false);
      setId(null);
    } else {
      postData(tasks);
      setTask("");
    }
  };

  const editTodo = (ele) => {
    setEdit(true);
    setId(ele._id);
    setTask(ele.task);
    setCompleted(ele.completed || false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-5 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-4">
          {edit ? "Edit Task" : "Add New Task"}
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700">
            {edit ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>

      <div className="max-w-lg mx-auto mt-10">
        {alltask.map((ele) => (
          <div
            key={ele._id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow mb-3"
          >
            <p
              className={`flex-1 ${
                ele.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {ele.task}
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => completeTask(ele)}
                disabled={ele.completed}
                className={`px-3 py-1 rounded ${
                  ele.completed
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"
                }`}
              >
                {ele.completed ? "Completed" : "Done"}
              </button>
              {ele.completed ? (
                ""
              ) : (
                <button
                  onClick={() => editTodo(ele)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => deleteData(ele._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
