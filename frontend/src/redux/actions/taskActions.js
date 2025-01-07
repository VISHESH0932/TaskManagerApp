import axios from 'axios';
import { GET_TASKS, ADD_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR } from './types';

const getConfig = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getTasks = (page = 1, limit = 10) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tasks?page=${page}&limit=${limit}`, getConfig());
    dispatch({ type: GET_TASKS, payload: res.data });
  } catch (error) {
    dispatch({ type: TASK_ERROR, payload: error.response.data.message });
  }
};

export const addTask = (task) => async (dispatch) => {
  try {
    const res = await axios.post('/api/tasks', task, getConfig());
    dispatch({ type: ADD_TASK, payload: res.data });
  } catch (error) {
    dispatch({ type: TASK_ERROR, payload: error.response.data.message });
  }
};

export const updateTask = (id, task) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/tasks/${id}`, task, getConfig());
    dispatch({ type: UPDATE_TASK, payload: res.data });
  } catch (error) {
    dispatch({ type: TASK_ERROR, payload: error.response.data.message });
  }
};

export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/tasks/${id}`, getConfig());
    dispatch({ type: DELETE_TASK, payload: id });
  } catch (error) {
    dispatch({ type: TASK_ERROR, payload: error.response.data.message });
  }
};