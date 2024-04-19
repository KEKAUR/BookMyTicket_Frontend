import { combineReducers } from 'redux';
import api1Reducer from './movieReducer'; // Assuming your movie reducer is named api1Reducer

const rootReducer = combineReducers({
  // Define your reducers here
  movies: api1Reducer, // Assuming your reducer handles movie-related actions
  // Add other reducers as needed
});

export default rootReducer;
