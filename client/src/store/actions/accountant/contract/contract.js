import axios from 'axios';
import { setAlert } from '../../alert';

import {
  ADD__CONTRACT,
  UPDATE__CONTRACT,
  GET_ALL__CONTRACT,
  GET_ONE__CONTRACT,
  DELETE__CONTRACT,
} from '../../types';

export const add__CONTRACT = (
  number__Contract,
  date_Contract,
  type_Contract,
  typesOf_WorkInTheContract,
  sum,
  ourFirm,
  client,
  active
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    number__Contract,
    date_Contract,
    type_Contract,
    typesOf_WorkInTheContract,
    sum,
    ourFirm,
    client,
    active,
  });

  try {
    const { data } = await axios.post(`/api/accountant/contract`, body, config);

    dispatch({
      type: ADD__CONTRACT,
      payload: data.data, //new obj
    });

    dispatch(getAll__CONTRACT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__CONTRACT = (
  id__CONTRACT,
  number__Contract,
  date_Contract,
  type_Contract,
  typesOf_WorkInTheContract,
  sum,
  ourFirm,
  client,
  active
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    number__Contract,
    date_Contract,
    type_Contract,
    typesOf_WorkInTheContract,
    sum,
    ourFirm,
    client,
    active,
  });

  try {
    const { data } = await axios.put(
      `/api/accountant/contract/${id__CONTRACT}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__CONTRACT,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__CONTRACT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__CONTRACT = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/accountant/contract`);
    dispatch({ type: GET_ALL__CONTRACT, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__CONTRACT = (id__CONTRACT) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/accountant/contract/${id__CONTRACT}`
    );

    dispatch({
      type: GET_ONE__CONTRACT,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__CONTRACT = (id__CONTRACT) => async (dispatch) => {
  try {
    await axios.delete(`/api/accountant/contract/${id__CONTRACT}`);
    dispatch({
      type: DELETE__CONTRACT,
      payload: id__CONTRACT,
    });
    dispatch(getAll__CONTRACT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
