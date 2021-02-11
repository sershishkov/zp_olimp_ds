import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__UNIT,
  UPDATE__UNIT,
  GET_ALL__UNIT,
  GET_ONE__UNIT,
  DELETE__UNIT,
} from '../types';

export const add__UNIT = (name__Unit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Unit,
  });

  try {
    const { data } = await axios.post(`/api/reference-data/unit`, body, config);

    dispatch({
      type: ADD__UNIT,
      payload: data.data, //new obj
    });

    dispatch(getAll__UNIT());
  } catch (err) {
    // console.log(err);
    if (err.response.data && err.response.data.error) {
      const error = err.response.data.error;
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__UNIT = (id__UNIT, name__Unit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Unit,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/unit/${id__UNIT}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__UNIT,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__UNIT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__UNIT = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/unit`);
    if (data) {
      dispatch({ type: GET_ALL__UNIT, payload: data.data });
    }
    //
  } catch (err) {
    if (err.response.data && err.response.data.error) {
      const error = err.response.data.error;
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__UNIT = (id__UNIT) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/unit/${id__UNIT}`);

    dispatch({
      type: GET_ONE__UNIT,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__UNIT = (id__UNIT) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/unit/${id__UNIT}`);
    dispatch({
      type: DELETE__UNIT,
      payload: id__UNIT,
    });
    dispatch(getAll__UNIT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
