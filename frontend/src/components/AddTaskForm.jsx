import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/actions/taskActions';
import { Container, TextField, Button } from '@mui/material';

const AddTaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    dispatch(addTask({ title, description }));
    setTitle('');
    setDescription('');
  };

  return (
    <Container>
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
        <Button type="submit" variant="contained" color="primary">Add Task</Button>
      </form>
    </Container>
  );
};

export default AddTaskForm;