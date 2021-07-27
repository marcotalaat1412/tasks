import React, {useState} from 'react';

const EditTask = ({editTask, task}) => {
    const [tasks, setTasks] = useState('');

    const submit = e =>{
        e.preventDefault();
        editTask(tasks, task)
    }

  return (
    <React.Fragment>
      <form className="edit-task" onSubmit={submit}>
        <input
          type="text"
          name="content"
          value={tasks}
          onChange={(e) => setTasks(e.target.value)}
        />
        <button
          type="submit"
          className="btn btn-secondary"
        >
          Edit
        </button>
      </form>
    </React.Fragment>
  );
};

export default EditTask;
