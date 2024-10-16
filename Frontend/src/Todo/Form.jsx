import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [task, setTask] = useState("");
  const [alltask, setAllTask] = useState([]);

  const [edit, setEdit] = useState(false);
  const [id, setId] = useState();

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
      console.log(`updated`,res);
      getData();
      setTask("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tasks = {
      task,
      id,
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

  const editTodo=(ele)=>{
    setEdit(true);
    setId(ele._id);
    setTask(ele.task);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div>
        <h1>Add New Task</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button>Add Task</button>
        </form>
      </div>
      <div>
        {alltask.map((ele) => (
          <div key={ele.key}>
            {" "}
            {/* Ensure 'id' is present in the task data */}
            <p>{ele.task}</p>
            <button onClick={() => deleteData(ele._id)}>Delete</button>
            <button onClick={() => editTodo(ele)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
