import React from 'react';
import axios from 'axios';
import EditTask from './edittask';
import { toast } from 'react-toastify';


const Tasks = ({ tasks, setTasks, done}) => {



      /*========================
        functions for buttons controles
      =========================*/

      const openColor = (e) => {
        let colorIcon = e.target;
        colorIcon.previousSibling.classList.toggle("active-color");
      };

      const menu = (e) =>{
        e.target.closest("div").firstChild.classList.toggle("inactive-control")
      }
    
      const editIcon = (e, task) => {
        let editIcon = e.target;
        editIcon.parentElement
          .closest("div")
          .nextSibling.classList.toggle("active-edit");
      };

      const editTask = async (contetnTask, task) => {

        const cloneTasks = [...tasks];
        const index = cloneTasks.indexOf(task);
        cloneTasks[index] = {...cloneTasks[index]};

        cloneTasks[index].content = contetnTask;

        const obj = {id: cloneTasks[index].id, content: contetnTask, color: cloneTasks[index].color, done : cloneTasks[index].done}

        await axios.put("https://60fb4c7591156a0017b4c7d9.mockapi.io/tasks/" + task.id, obj);
    
        setTasks(cloneTasks);

      }
    
    
      const chooseColor = async (e, task) => {
        let color = e.target.style.backgroundColor;
        const cloneTasks = [...tasks];
        const index = cloneTasks.indexOf(task);
        cloneTasks[index] = {...cloneTasks[index]};

        cloneTasks[index].color = color

        const obj = {id: task.id, content: tasks[index].content, color, done : tasks[index].done}
        
        await axios.put("https://60fb4c7591156a0017b4c7d9.mockapi.io/tasks/" + task.id, obj);
    
        setTasks(cloneTasks);
      };

      const deleteTask = async task => {
        const cloneTasks = tasks.filter(t => t.id !== task.id);

        try{
           await axios.delete("https://60fb4c7591156a0017b4c7d9.mockapi.io/tasks/" + task.id);
           toast("Deleted")
        }catch{
          await axios.delete("https://60fb4c7591156a0017b4c7d9.mockapi.io/tasks/" + task.id)
          toast.error("Error")
        }

        setTasks(cloneTasks);
      }

    return (
        <React.Fragment>
          <h1 className="head-task animate__animated animate__bounce">My Tasks</h1>
            {tasks !== undefined && tasks.map(task => (
                 <div
                 id="single-task"
                 className="display-tasks"
                 key={Math.random().toString(36).substr(2, 9)}
                 style={
                   task.color
                     ? { backgroundColor: task.color, color: "#FFF" }
                     : { backgroundColor: "d3b2b270", color: "#333"}
                 }
               >
                 <input
                   type="checkbox"
                   id={task.id}
                   onClick={() => done(task)}
                   checked={task.done ? true : false}
                   readOnly
                 />
                 <span
                   htmlFor={task.id}
                   className="content"
                   style={
                     task.done
                       ? { textDecoration: "line-through", color: "#999" }
                       : { textDecoration: "none" }
                   }
                   onClick={() => done(task)}
                 >
                   {task.content}
                 </span>
                 <div className="control">
                   <ul className="ul-control inactive-control">
                     <li>
                       <div className="color" id="color">
                         <span
                           className="red"
                           style={{ backgroundColor: "#dc3545" }}
                           onClick={(e) => chooseColor(e, task)}
                         ></span>
                         <span
                           className="blue"
                           style={{ backgroundColor: "#0d6efd" }}
                           onClick={(e) => chooseColor(e, task)}
                         ></span>
                         <span
                           className="purple"
                           style={{ backgroundColor: "#953553" }}
                           onClick={(e) => chooseColor(e, task)}
                         ></span>
                         <span
                           className="orange"
                           style={{ backgroundColor: "#ff5722" }}
                           onClick={(e) => chooseColor(e, task)}
                         ></span>
                         <span
                           className="green"
                           style={{ backgroundColor: "#ffededd5" }}
                           onClick={(e) => chooseColor(e, task)}
                         ></span>
                         <span
                           className="white"
                           style={{ backgroundColor: "#00cc00" }}
                           onClick={(e) => chooseColor(e, task)}
                         ></span>
                       </div>
                       <i className="fas fa-palette"  onClick={openColor}></i>
                     </li>
                     <li>
                       <i
                         className="fas fa-edit any"
                         onClick={(e) => editIcon(e, task)}
                       ></i>
                     </li>
                     <li>
                       <i
                         className="fas fa-trash"
                         onClick={() => deleteTask(task)}
                       ></i>
                     </li>
                   </ul>
                 <span className="menu"><i className="fas fa-ellipsis-v menu" onClick={menu}></i></span>
                 </div>
                 <EditTask  editTask={editTask} task={task} />
               </div>
            ) )}
        </React.Fragment>
    )
}
 
export default Tasks;
