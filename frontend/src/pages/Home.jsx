import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { Container, Typography, Button, Box, AppBar, Toolbar } from '@mui/material';
import { logout } from '../redux/actions/authActions';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container >
      <AppBar position="static" style= {{width: '100%'}} sx={{bgcolor:'lightseagreen'}}>
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
      <Box mt={4} textAlign="center">
      
        <Typography variant="h4" gutterBottom>
          Welcome to Task Management Application
        </Typography>
        {authState.isLoggedIn ? (
          <Navigate to="/tasks" />
        ) : (
          <Typography variant="body1" gutterBottom>
            If you want to move forward with our Task Management Application, please sign up or log in.
          </Typography>
        )}
      </Box>
      <Box
          component="img"
          //src to image in public folder
          src="/3573382.jpg"
          alt="Task Management"
          sx={{ width: '100%', maxHeight: '600px', objectFit: 'fill' }}
        />
    </Container>
  );
};

export default Home;