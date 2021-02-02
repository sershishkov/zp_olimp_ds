import axios from 'axios';
import { setAlert } from '../../alert';

import {
  ADD__OUR_USER,
  UPDATE__OUR_USER,
  GET_ALL__OUR_USER,
  GET_ONE__OUR_USER,
  DELETE__OUR_USER,
} from '../../types';

export const add__OUR_USER = (name, email, role, password) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    role,
    password,
  });

  try {
    const { data } = await axios.post(`/api/user-admin`, body, config);

    dispatch({
      type: ADD__OUR_USER,
      payload: data.data, //new obj
    });

    dispatch(getAll__OUR_USER());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__OUR_USER = (
  id__OUR_USER,
  name,
  email,
  role,
  password
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name,
    email,
    role,
    password,
  });

  try {
    const { data } = await axios.put(
      `/api/user-admin/${id__OUR_USER}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__OUR_USER,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__OUR_USER());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__OUR_USER = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/user-admin`);
    dispatch({ type: GET_ALL__OUR_USER, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__OUR_USER = (id__OUR_USER) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/user-admin/${id__OUR_USER}`);

    dispatch({
      type: GET_ONE__OUR_USER,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__OUR_USER = (id__OUR_USER) => async (dispatch) => {
  try {
    await axios.delete(`/api/user-admin/${id__OUR_USER}`);
    dispatch({
      type: DELETE__OUR_USER,
      payload: id__OUR_USER,
    });
    dispatch(getAll__OUR_USER());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
