import { FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from '../../actions/types';

const initialState = {
  data: null,
  loading: false,
  error: null
};

const api1Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case FETCH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default api1Reducer;
