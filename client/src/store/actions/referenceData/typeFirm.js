import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__TYPE_FIRM,
  UPDATE__TYPE_FIRM,
  GET_ALL__TYPE_FIRM,
  GET_ONE__TYPE_FIRM,
  DELETE__TYPE_FIRM,
} from '../types';

export const add__TYPE_FIRM = (
  name__Type_Firm,
  short_name__Type_Firm
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Type_Firm,
    short_name__Type_Firm,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/type-firm`,
      body,
      config
    );

    dispatch({
      type: ADD__TYPE_FIRM,
      payload: data.data, //new obj
    });

    dispatch(getAll__TYPE_FIRM());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__TYPE_FIRM = (
  id__TYPE_FIRM,
  name__Type_Firm,
  short_name__Type_Firm
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Type_Firm,
    short_name__Type_Firm,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/type-firm/${id__TYPE_FIRM}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__TYPE_FIRM,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__TYPE_FIRM());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__TYPE_FIRM = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/type-firm`);
    dispatch({ type: GET_ALL__TYPE_FIRM, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__TYPE_FIRM = (id__TYPE_FIRM) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/type-firm/${id__TYPE_FIRM}`
    );

    dispatch({
      type: GET_ONE__TYPE_FIRM,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__TYPE_FIRM = (id__TYPE_FIRM) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/type-firm/${id__TYPE_FIRM}`);
    dispatch({
      type: DELETE__TYPE_FIRM,
      payload: id__TYPE_FIRM,
    });
    dispatch(getAll__TYPE_FIRM());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
