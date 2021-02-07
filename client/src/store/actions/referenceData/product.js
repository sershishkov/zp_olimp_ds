import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__PRODUCT,
  UPDATE__PRODUCT,
  GET_ALL__PRODUCT,
  GET_ONE__PRODUCT,
  DELETE__PRODUCT,
} from '../types';

export const add__PRODUCT = (
  name__Product,
  unit,
  group_Product,
  amountInPackage,
  expenseFor,
  length,
  width,
  height,
  weight
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Product,
    unit,
    group_Product,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/product`,
      body,
      config
    );

    dispatch({
      type: ADD__PRODUCT,
      payload: data.data, //new obj
    });

    dispatch(getAll__PRODUCT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__PRODUCT = (
  id__PRODUCT,
  name__Product,
  unit,
  group_Product,
  amountInPackage,
  expenseFor,
  length,
  width,
  height,
  weight
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Product,
    unit,
    group_Product,
    amountInPackage,
    expenseFor,
    length,
    width,
    height,
    weight,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/product/${id__PRODUCT}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__PRODUCT,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__PRODUCT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__PRODUCT = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/product`);
    dispatch({ type: GET_ALL__PRODUCT, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__PRODUCT = (id__PRODUCT) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/product/${id__PRODUCT}`
    );

    dispatch({
      type: GET_ONE__PRODUCT,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__PRODUCT = (id__PRODUCT) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/product/${id__PRODUCT}`);
    dispatch({
      type: DELETE__PRODUCT,
      payload: id__PRODUCT,
    });
    dispatch(getAll__PRODUCT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
