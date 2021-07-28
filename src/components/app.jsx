import React, { useEffect, useState } from "react";
import axios from "axios";
import AddTask from "./addtask";
import Tasks from "./tasks";
import { v4 as uuidv4 } from "uuid";
import { Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  const [tasks, setTasks] = useState([
    axios.get("http://localhost:3001/tasks"),
  ]);

  useEffect(() => {
    // Get Data
    const getData = async () => {
      const { data } = await axios.get("http://localhost:3001/tasks");
      setTasks(data);
    };
    getData();
    //==========================//
  }, []);

  /*========================
        AddTask Component Function
      =========================*/
  const addTask = async (content) => {
    const obj = { id: uuidv4(), content, color: "", done: false };
    await axios.post("http://localhost:3001/tasks/", obj);
    setTasks([...tasks, obj]);
  };
  //==========================//
  const done = async (task) => {
    const cloneTasks = [...tasks];
    const index = cloneTasks.indexOf(task);
    cloneTasks[index] = { ...cloneTasks[index] };

    cloneTasks[index].done = !cloneTasks[index].done;

    try{
    await axios.put(
      "http://localhost:3001/tasks/" + cloneTasks[index].id,
      cloneTasks[index]
    );
    cloneTasks[index].done ?  toast.success("You did it, Good Job ;)") : toast.success("Common try, hero ")
    }catch{
      await axios.put(
        "http://localhost:3001/tasks/" + cloneTasks[index].id,
        cloneTasks[index]
      );
      toast.error("Error :(")
    }
    setTasks(cloneTasks);
  };

  return (
    <React.Fragment>
      <div className="container">
      <ToastContainer />
      <Route
        path="/:id?"
        render={(props) => (
          <Tasks tasks={tasks} setTasks={setTasks} done={done} {...props} />
        )}
      />
      <AddTask addTask={addTask} />
      </div>
    </React.Fragment>
  );
};

export default App;
