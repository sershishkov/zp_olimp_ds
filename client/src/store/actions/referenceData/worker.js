import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__WORKER,
  UPDATE__WORKER,
  GET_ALL__WORKER,
  GET_ONE__WORKER,
  DELETE__WORKER,
} from '../types';

export const add__WORKER = (
  name__Worker,
  middleName,
  surname,
  dateOf_Birth,
  postCode,
  address,
  individualTaxNumber,
  phoneNumber
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Worker,
    middleName,
    surname,
    dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/worker`,
      body,
      config
    );

    dispatch({
      type: ADD__WORKER,
      payload: data.data, //new obj
    });

    dispatch(getAll__WORKER());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__WORKER = (
  id__WORKER,
  name__Worker,
  middleName,
  surname,
  dateOf_Birth,
  postCode,
  address,
  individualTaxNumber,
  phoneNumber
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Worker,
    middleName,
    surname,
    dateOf_Birth,
    postCode,
    address,
    individualTaxNumber,
    phoneNumber,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/worker/${id__WORKER}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__WORKER,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__WORKER());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__WORKER = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/worker`);
    dispatch({ type: GET_ALL__WORKER, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__WORKER = (id__WORKER) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/worker/${id__WORKER}`
    );

    dispatch({
      type: GET_ONE__WORKER,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__WORKER = (id__WORKER) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/worker/${id__WORKER}`);
    dispatch({
      type: DELETE__WORKER,
      payload: id__WORKER,
    });
    dispatch(getAll__WORKER());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
