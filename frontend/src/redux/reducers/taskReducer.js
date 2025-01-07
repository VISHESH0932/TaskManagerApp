import {
  GET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  TASK_ERROR,
} from '../actions/types';

const initialState = {
  tasks: [],
  totalPages: 1,
  currentPage: 1,
  error: null,
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload.tasks,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };
    case ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.payload._id ? action.payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
      };
    case TASK_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default taskReducer;