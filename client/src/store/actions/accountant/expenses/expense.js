import axios from 'axios';
import { setAlert } from '../../alert';

import {
  ADD__EXPENSE,
  UPDATE__EXPENSE,
  GET_ALL__EXPENSE,
  GET_ONE__EXPENSE,
  DELETE__EXPENSE,
} from '../../types';

export const add__EXPENSE = (name__Expense, group_Expense) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Expense,
    group_Expense,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/expense`,
      body,
      config
    );

    dispatch({
      type: ADD__EXPENSE,
      payload: data.data, //new obj
    });

    dispatch(getAll__EXPENSE());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__EXPENSE = (
  id__EXPENSE,
  name__Expense,
  group_Expense
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Expense,
    group_Expense,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/expense/${id__EXPENSE}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__EXPENSE,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__EXPENSE());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__EXPENSE = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/expense`);
    dispatch({ type: GET_ALL__EXPENSE, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__EXPENSE = (id__EXPENSE) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/expense/${id__EXPENSE}`
    );

    dispatch({
      type: GET_ONE__EXPENSE,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__EXPENSE = (id__EXPENSE) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/expense/${id__EXPENSE}`);
    dispatch({
      type: DELETE__EXPENSE,
      payload: id__EXPENSE,
    });
    dispatch(getAll__EXPENSE());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
