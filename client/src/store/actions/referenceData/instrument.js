import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__INSTRUMENT,
  UPDATE__INSTRUMENT,
  GET_ALL__INSTRUMENT,
  GET_ONE__INSTRUMENT,
  DELETE__INSTRUMENT,
} from '../types';

export const add__INSTRUMENT = (name__Instrument, unit) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Instrument,
    unit,
  });

  try {
    const { data } = await axios.post(
      `/api/reference-data/instrument`,
      body,
      config
    );

    dispatch({
      type: ADD__INSTRUMENT,
      payload: data.data, //new obj
    });

    dispatch(getAll__INSTRUMENT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__INSTRUMENT = (
  id__INSTRUMENT,
  name__Instrument,
  unit
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Instrument,
    unit,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/instrument/${id__INSTRUMENT}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__INSTRUMENT,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__INSTRUMENT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__INSTRUMENT = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/instrument`);
    dispatch({ type: GET_ALL__INSTRUMENT, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__INSTRUMENT = (id__INSTRUMENT) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/api/reference-data/instrument/${id__INSTRUMENT}`
    );

    dispatch({
      type: GET_ONE__INSTRUMENT,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__INSTRUMENT = (id__INSTRUMENT) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/instrument/${id__INSTRUMENT}`);
    dispatch({
      type: DELETE__INSTRUMENT,
      payload: id__INSTRUMENT,
    });
    dispatch(getAll__INSTRUMENT());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
