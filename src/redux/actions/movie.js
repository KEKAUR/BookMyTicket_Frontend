import axios from 'axios';
import { FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_DATA_FAILURE } from './types';
import { Api_url } from '../../auth/auth';

export const fetchDataFromApi1 = () => {
  return (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });

    axios.get(`${Api_url}movies`)
      .then(response => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: FETCH_DATA_FAILURE,
          payload: error.message
        });
      });
  };
};
