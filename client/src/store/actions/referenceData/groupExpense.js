import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__GROUP_EXPENSE,
  UPDATE__GROUP_EXPENSE,
  GET_ALL__GROUP_EXPENSE,
  GET_ONE__GROUP_EXPENSE,
  DELETE__GROUP_EXPENSE,
} from '../types';

export const add__GROUP_EXPENSE = (name__Group_Expense) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_Expense,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/group-expense`,
      body,
      config
    );

    dispatch({
      type: ADD__GROUP_EXPENSE,
      payload: data.data, //new obj
    });

    dispatch(getAll__GROUP_EXPENSE());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__GROUP_EXPENSE = (
  id__GROUP_EXPENSE,
  name__Group_Expense
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_Expense,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/group-expense/${id__GROUP_EXPENSE}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__GROUP_EXPENSE,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__GROUP_EXPENSE());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__GROUP_EXPENSE = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/group-expense`);
    dispatch({ type: GET_ALL__GROUP_EXPENSE, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__GROUP_EXPENSE = (id__GROUP_EXPENSE) => async (
  dispatch
) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/group-expense/${id__GROUP_EXPENSE}`
    );

    dispatch({
      type: GET_ONE__GROUP_EXPENSE,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__GROUP_EXPENSE = (id__GROUP_EXPENSE) => async (
  dispatch
) => {
  try {
    await axios.delete(
      `/api/reference-data/group-expense/${id__GROUP_EXPENSE}`
    );
    dispatch({
      type: DELETE__GROUP_EXPENSE,
      payload: id__GROUP_EXPENSE,
    });
    dispatch(getAll__GROUP_EXPENSE());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
