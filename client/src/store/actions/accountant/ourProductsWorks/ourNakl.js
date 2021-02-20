import axios from 'axios';
import { setAlert } from '../../alert';

import {
  ADD__OUR_NAKL,
  UPDATE__OUR_NAKL,
  GET_ALL__OUR_NAKL,
  GET_ONE__OUR_NAKL,
  DELETE__OUR_NAKL,
} from '../../types';

export const add__OUR_NAKL = (
  naklNumber,
  naclDate,
  contract,
  ourFirm,
  client,
  products,
  formOfPayment,
  active
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    naklNumber,
    naclDate,
    contract,
    ourFirm,
    client,
    products,
    formOfPayment,
    active,
  });

  try {
    const { data } = await axios.post(
      `/accountant/our-products-works/our-nakl`,
      body,
      config
    );

    dispatch({
      type: ADD__OUR_NAKL,
      payload: data.data, //new obj
    });

    dispatch(getAll__OUR_NAKL());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__OUR_NAKL = (
  id__OUR_NAKL,
  naklNumber,
  naclDate,
  contract,
  ourFirm,
  client,
  products,
  formOfPayment,
  active
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    naklNumber,
    naclDate,
    contract,
    ourFirm,
    client,
    products,
    formOfPayment,
    active,
  });

  try {
    const { data } = await axios.put(
      `/accountant/our-products-works/our-nakl/${id__OUR_NAKL}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__OUR_NAKL,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__OUR_NAKL());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__OUR_NAKL = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/accountant/our-products-works/our-nakl`);
    dispatch({ type: GET_ALL__OUR_NAKL, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__OUR_NAKL = (id__OUR_NAKL) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/accountant/our-products-works/our-nakl/${id__OUR_NAKL}`
    );

    dispatch({
      type: GET_ONE__OUR_NAKL,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__OUR_NAKL = (id__OUR_NAKL) => async (dispatch) => {
  try {
    await axios.delete(
      `/accountant/our-products-works/our-nakl/${id__OUR_NAKL}`
    );
    dispatch({
      type: DELETE__OUR_NAKL,
      payload: id__OUR_NAKL,
    });
    dispatch(getAll__OUR_NAKL());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
