import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import taskReducer from './reducers/taskReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  taskReducer,
  authReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;