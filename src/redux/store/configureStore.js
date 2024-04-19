import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk'; // Middleware for handling asynchronous actions
import { composeWithDevTools } from 'redux-devtools-extension'; // Optional: DevTools extension for debugging

// Import your reducers
import api1Reducer from '../reducers/apiReducers/movieReducer';

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  api1: api1Reducer,
  // Add more reducers here...
});

// Create the Redux store
const store = createStore(
  rootReducer, // Combined reducer
  composeWithDevTools(applyMiddleware(thunk)) // Apply middleware (e.g., redux-thunk)
);

export default store;
