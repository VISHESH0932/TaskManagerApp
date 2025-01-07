import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../redux/actions/taskActions';
import { TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const EditTaskForm = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTask(task._id, { title, description, status }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormControlLabel
        control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
        label="Completed"
      />
      <Button type="submit" variant="contained" color="primary">
        Update Task
      </Button>
    </form>
  );
};

export default EditTaskForm;