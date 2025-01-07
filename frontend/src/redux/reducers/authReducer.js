import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT, SAVE_PROFILE } from '../actions/types';

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user,
        error: null,
      };
    case LOGIN_FAILURE:
    case SIGNUP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: null,
      };
    case SAVE_PROFILE:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;