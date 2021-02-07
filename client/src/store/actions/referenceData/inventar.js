import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__INVENTAR,
  UPDATE__INVENTAR,
  GET_ALL__INVENTAR,
  GET_ONE__INVENTAR,
  DELETE__INVENTAR,
} from '../types';

export const add__INVENTAR = (name__Inventar, unit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Inventar,
    unit,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/inventar`,
      body,
      config
    );

    dispatch({
      type: ADD__INVENTAR,
      payload: data.data, //new obj
    });

    dispatch(getAll__INVENTAR());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__INVENTAR = (id__INVENTAR, name__Inventar, unit) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Inventar,
    unit,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/inventar/${id__INVENTAR}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__INVENTAR,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__INVENTAR());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__INVENTAR = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/inventar`);
    dispatch({ type: GET_ALL__INVENTAR, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__INVENTAR = (id__INVENTAR) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/inventar/${id__INVENTAR}`
    );

    dispatch({
      type: GET_ONE__INVENTAR,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__INVENTAR = (id__INVENTAR) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/inventar/${id__INVENTAR}`);
    dispatch({
      type: DELETE__INVENTAR,
      payload: id__INVENTAR,
    });
    dispatch(getAll__INVENTAR());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
