
import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT, SAVE_PROFILE } from './types';

export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', credentials);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};

export const signup = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/signup', credentials);
    dispatch({ type: SIGNUP_SUCCESS, payload: res.data });
    localStorage.setItem('token', res.data.token);
  } catch (error) {
    dispatch({ type: SIGNUP_FAILURE, payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/api/auth/logout', {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    localStorage.removeItem('token');
    dispatch({ type: LOGOUT });
  } catch (error) {
    console.error('Logout failed', error);
  }
};

export const saveProfile = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: SAVE_PROFILE, payload: res.data });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response.data.message });
  }
};