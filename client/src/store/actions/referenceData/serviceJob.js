import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__SERVICE_JOB,
  UPDATE__SERVICE_JOB,
  GET_ALL__SERVICE_JOB,
  GET_ONE__SERVICE_JOB,
  DELETE__SERVICE_JOB,
} from '../types';

export const add__SERVICE_JOB = (
  name__ServiceJob,
  unit,
  group_ServiceJob,
  employeePrice,
  sellingPrice,
  products,
  inventars,
  instruments,
  equipments
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__ServiceJob,
    unit,
    group_ServiceJob,
    employeePrice,
    sellingPrice,
    products,
    inventars,
    instruments,
    equipments,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/service-job`,
      body,
      config
    );

    dispatch({
      type: ADD__SERVICE_JOB,
      payload: data.data, //new obj
    });

    dispatch(getAll__SERVICE_JOB());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__SERVICE_JOB = (
  id__SERVICE_JOB,
  name__ServiceJob,
  unit,
  group_ServiceJob,
  employeePrice,
  sellingPrice,
  products,
  inventars,
  instruments,
  equipments
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__ServiceJob,
    unit,
    group_ServiceJob,
    employeePrice,
    sellingPrice,
    products,
    inventars,
    instruments,
    equipments,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/service-job/${id__SERVICE_JOB}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__SERVICE_JOB,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__SERVICE_JOB());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__SERVICE_JOB = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/service-job`);
    dispatch({ type: GET_ALL__SERVICE_JOB, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__SERVICE_JOB = (id__SERVICE_JOB) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/service-job/${id__SERVICE_JOB}`
    );

    dispatch({
      type: GET_ONE__SERVICE_JOB,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__SERVICE_JOB = (id__SERVICE_JOB) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/service-job/${id__SERVICE_JOB}`);
    dispatch({
      type: DELETE__SERVICE_JOB,
      payload: id__SERVICE_JOB,
    });
    dispatch(getAll__SERVICE_JOB());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
