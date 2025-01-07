import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import { Container, TextField, Button, Typography, Box, Alert, Paper } from '@mui/material';
import { Link, Navigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authReducer);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ email, password }));
  };

  if (authState.isLoggedIn) {
    return <Navigate to="/tasks" />;
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, bgcolor: 'lightseagreen', color: 'white' }}>
        <Box textAlign="center">
          <Typography variant="h4" gutterBottom>
            Signup
          </Typography>
          {authState.error && <Alert severity="error">{authState.error}</Alert>}
        </Box>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="filled"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              backgroundColor: 'white',
              '& .MuiInputBase-input': {
                color: 'black',
              },
              '& .MuiInputLabel-root': {
                color: 'black',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="filled"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              backgroundColor: 'white',
              '& .MuiInputBase-input': {
                color: 'black',
              },
              '& .MuiInputLabel-root': {
                color: 'black',
              },
            }}
          />
          <Box mt={2} mb={2}>
            <Button type="submit" variant="contained" color="info" fullWidth>
              Signup
            </Button>
          </Box>
        </form>
        <Box textAlign="center">
          <Typography variant="body2">
            Already have an account? <Link to="/login" style={{ color: 'white' }}>Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Signup;