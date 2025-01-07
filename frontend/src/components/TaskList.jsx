import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks, addTask, deleteTask } from '../redux/actions/taskActions';
import { Container, List, ListItem, ListItemText, Button, Checkbox, TextField, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle, AppBar, Toolbar, Typography, Box, Pagination } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
import EditTaskForm from './EditTaskForm';
import AddTaskForm from './AddTaskForm'; // Import AddTaskForm

const TaskList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Define navigate using useNavigate hook
  const { tasks, totalPages, currentPage } = useSelector((state) => state.taskReducer);
  const authState = useSelector((state) => state.authReducer);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('created_at');
  const [editTask, setEditTask] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    if (authState.isLoggedIn) {
      console.log('Fetching tasks...');
      dispatch(getTasks());
    }
  }, [dispatch, authState.isLoggedIn]);

  useEffect(() => {
    console.log('Tasks state:', tasks);
  }, [tasks]);

  const handleDelete = (id) => {
    console.log('Deleting task with id:', id);
    dispatch(deleteTask(id));
  };

  const handleEdit = (task) => {
    console.log('Editing task:', task);
    setEditTask(task);
  };

  const handleCloseEdit = () => {
    console.log('Closing edit dialog');
    setEditTask(null);
  };

  const handleLogout = () => {
    console.log('Logging out');
    dispatch(logout());
    navigate('/'); // Navigate to home page
  };

  const handleOpenAddDialog = () => {
    console.log('Opening add task dialog');
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    console.log('Closing add task dialog');
    setOpenAddDialog(false);
  };

  const handleAddTask = (task) => {
    console.log('Adding task:', task);
    dispatch(addTask(task));
    handleCloseAddDialog();
  };

  const handlePageChange = (event, value) => {
    console.log('Changing page to:', value);
    dispatch(getTasks(value));
  };

  const filteredTasks = Array.isArray(tasks) ? tasks
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()))
    .filter(task => filter === 'all' || (filter === 'completed' ? task.status : !task.status))
    .sort((a, b) => (a[sort] > b[sort] ? 1 : -1)) : [];

  if (!authState.isLoggedIn) {
    return null; // Render nothing if the user is not logged in
  }

  return (
    <>
      <AppBar position="static" style={{ width: '100', backgroundColor:'lightseagreen'}} >
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Task Management Application
          </Typography>
          {authState.isLoggedIn ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Box mt={4}>
          <Button variant="contained" color="inherit" onClick={handleOpenAddDialog}>
            Add Task
          </Button>
          <Box mt={2}>
            <TextField
              label="Search"
              variant="outlined"
              fullWidth
              margin="normal"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
          <Box mt={2} display="flex" gap={2}>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </Box>
          <Box mt={1}>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              fullWidth
            >
              <MenuItem value="created_at">Created At</MenuItem>
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select>
          </Box>
          <Box mt={2}>
            <List>
              {filteredTasks.map((task) => (
                <Box key={task._id} mb={2}>
                  <ListItem key={task._id} sx={{bgcolor:'mintcream'}} divider>
                    <ListItemText
                      primary={task.title}
                      secondary={task.description}
                    />
                    <Checkbox
                      checked={task.status}
                      color="success"
                      disabled
                      sx={{ bgcolor: 'primary' }}
                    />
                    <Box display="flex" gap={2}>
                      <Button variant="contained" color="error" onClick={() => handleDelete(task._id)}>Delete</Button>
                      <Button variant="contained" color="success" onClick={() => handleEdit(task)}>Edit</Button>
                    </Box>
                  </ListItem>
                </Box>
              ))}
            </List>
          </Box>
          <Pagination
            count={totalPages}
            page={currentPage || 1} // Ensure default value
            onChange={handlePageChange}
            color="primary"
          />
          {editTask && (
            <Dialog open={true} onClose={handleCloseEdit}>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogContent>
                <EditTaskForm task={editTask} onClose={handleCloseEdit} />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          )}
          <Dialog open={openAddDialog} onClose={handleCloseAddDialog}>
            <DialogTitle>Add Task</DialogTitle>
            <DialogContent>
              <AddTaskForm onAddTask={handleAddTask} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAddDialog} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    </>
  );
};

export default TaskList;