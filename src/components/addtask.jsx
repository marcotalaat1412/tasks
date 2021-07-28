import React, {useState} from 'react';

const AddTask = ({addTask}) => {
    const [tasks, setTasks] = useState('');

    const submit = e =>{
        e.preventDefault();
        addTask(tasks)
        setTasks(e.currentTarget.value = "")
    }

    return ( 
        <form onSubmit={submit} className="add-task-form position-relative">
          <label htmlFor="tasks" className="d-block">I want to finish ...</label>
          <input
          type="text"
            className="form-control"
            id="tasks"
            name="content"
            value={tasks}
            onChange={e => setTasks(e.currentTarget.value)}
          />
        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
     );
}
 
export default AddTask;