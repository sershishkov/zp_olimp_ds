import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__EQUIPMENT,
  UPDATE__EQUIPMENT,
  GET_ALL__EQUIPMENT,
  GET_ONE__EQUIPMENT,
  DELETE__EQUIPMENT,
} from '../types';

export const add__EQUIPMENT = (name__Equipment, unit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Equipment,
    unit,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/equipment`,
      body,
      config
    );

    dispatch({
      type: ADD__EQUIPMENT,
      payload: data.data, //new obj
    });

    dispatch(getAll__EQUIPMENT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__EQUIPMENT = (
  id__EQUIPMENT,
  name__Equipment,
  unit
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Equipment,
    unit,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/equipment/${id__EQUIPMENT}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__EQUIPMENT,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__EQUIPMENT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__EQUIPMENT = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/equipment`);
    dispatch({ type: GET_ALL__EQUIPMENT, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__EQUIPMENT = (id__EQUIPMENT) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/equipment/${id__EQUIPMENT}`
    );

    dispatch({
      type: GET_ONE__EQUIPMENT,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__EQUIPMENT = (id__EQUIPMENT) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/equipment/${id__EQUIPMENT}`);
    dispatch({
      type: DELETE__EQUIPMENT,
      payload: id__EQUIPMENT,
    });
    dispatch(getAll__EQUIPMENT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
