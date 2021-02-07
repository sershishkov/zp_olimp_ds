import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__GROUP_SERVICE_JOB,
  UPDATE__GROUP_SERVICE_JOB,
  GET_ALL__GROUP_SERVICE_JOB,
  GET_ONE__GROUP_SERVICE_JOB,
  DELETE__GROUP_SERVICE_JOB,
} from '../types';

export const add__GROUP_SERVICE_JOB = (name__Group_ServiceJob) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_ServiceJob,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/group-service-job`,
      body,
      config
    );

    dispatch({
      type: ADD__GROUP_SERVICE_JOB,
      payload: data.data, //new obj
    });

    dispatch(getAll__GROUP_SERVICE_JOB());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__GROUP_SERVICE_JOB = (
  id__GROUP_SERVICE_JOB,
  name__Group_ServiceJob
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_ServiceJob,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/group-service-job/${id__GROUP_SERVICE_JOB}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__GROUP_SERVICE_JOB,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__GROUP_SERVICE_JOB());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__GROUP_SERVICE_JOB = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/group-service-job`);
    dispatch({ type: GET_ALL__GROUP_SERVICE_JOB, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__GROUP_SERVICE_JOB = (id__GROUP_SERVICE_JOB) => async (
  dispatch
) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/group-service-job/${id__GROUP_SERVICE_JOB}`
    );

    dispatch({
      type: GET_ONE__GROUP_SERVICE_JOB,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__GROUP_SERVICE_JOB = (id__GROUP_SERVICE_JOB) => async (
  dispatch
) => {
  try {
    await axios.delete(
      `/api/reference-data/group-service-job/${id__GROUP_SERVICE_JOB}`
    );
    dispatch({
      type: DELETE__GROUP_SERVICE_JOB,
      payload: id__GROUP_SERVICE_JOB,
    });
    dispatch(getAll__GROUP_SERVICE_JOB());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
