import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__GROUP_PRODUCT,
  UPDATE__GROUP_PRODUCT,
  GET_ALL__GROUP_PRODUCT,
  GET_ONE__GROUP_PRODUCT,
  DELETE__GROUP_PRODUCT,
} from '../types';

export const add__GROUP_PRODUCT = (name__Group_Product) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_Product,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/group-product`,
      body,
      config
    );

    dispatch({
      type: ADD__GROUP_PRODUCT,
      payload: data.data, //new obj
    });

    dispatch(getAll__GROUP_PRODUCT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__GROUP_PRODUCT = (
  id__GROUP_PRODUCT,
  name__Group_Product
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_Product,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/group-product/${id__GROUP_PRODUCT}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__GROUP_PRODUCT,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__GROUP_PRODUCT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__GROUP_PRODUCT = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/group-product`);
    dispatch({ type: GET_ALL__GROUP_PRODUCT, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__GROUP_PRODUCT = (id__GROUP_PRODUCT) => async (
  dispatch
) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/group-product/${id__GROUP_PRODUCT}`
    );

    dispatch({
      type: GET_ONE__GROUP_PRODUCT,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__GROUP_PRODUCT = (id__GROUP_PRODUCT) => async (
  dispatch
) => {
  try {
    await axios.delete(
      `/api/reference-data/group-product/${id__GROUP_PRODUCT}`
    );
    dispatch({
      type: DELETE__GROUP_PRODUCT,
      payload: id__GROUP_PRODUCT,
    });
    dispatch(getAll__GROUP_PRODUCT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
