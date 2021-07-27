import React, {useState} from 'react';

const AddTask = ({addTask}) => {
    const [tasks, setTasks] = useState('');

    const submit = e =>{
        e.preventDefault();
        addTask(tasks)
        setTasks(e.currentTarget.value = "")
    }

    return ( 
        <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="tasks">I want to finish ...</label>
          <textarea
            className="form-control"
            id="tasks"
            name="content"
            value={tasks}
            onChange={e => setTasks(e.currentTarget.value)}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Task
        </button>
      </form>
     );
}
 
export default AddTask;