import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import EditTaskForm from './components/EditTaskForm';
import { saveProfile } from './redux/actions/authActions';
import { Container } from '@mui/material';

function App() {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    dispatch(saveProfile(token));
  }, [authState.isLoggedIn, dispatch]);

  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={authState.isLoggedIn ? <Navigate to="/tasks" /> : <Signup />} />
          <Route path="/login" element={authState.isLoggedIn ? <Navigate to="/tasks" /> : <Login />} />
          <Route path="/tasks" element={authState.isLoggedIn ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="/tasks/add" element={authState.isLoggedIn ? <AddTaskForm /> : <Navigate to="/login" state={{ redirectUrl: "/tasks/add" }} />} />
          <Route path="/tasks/:taskId" element={authState.isLoggedIn ? <EditTaskForm /> : <Navigate to="/login" state={{ redirectUrl: window.location.pathname }} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;