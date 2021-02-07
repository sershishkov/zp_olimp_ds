import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__FIRM,
  UPDATE__FIRM,
  GET_ALL__FIRM,
  GET_ONE__FIRM,
  DELETE__FIRM,
} from '../types';

export const add__FIRM = (
  name__Firm,
  short_name__Firm,
  type_Firm,
  postCode,
  address,
  EDRPOU,
  ibanOwn,
  ibanGazBank,
  firstPerson__Position,
  firstPerson__Position_RoditelPadej,
  firstPerson__Full_Name,
  firstPerson__Full_Name_RoditelPadej,
  firstPerson__Short_Name,
  whichActsOnTheBasis,
  issuedBy,
  taxPayerOn,
  certificate_PDV,
  email,
  phoneNumber,
  who_is
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  });

  try {
    const { data } = await axios.post(`/api/reference-data/firm`, body, config);

    dispatch({
      type: ADD__FIRM,
      payload: data.data, //new obj
    });

    dispatch(getAll__FIRM());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__FIRM = (
  id__FIRM,
  name__Firm,
  short_name__Firm,
  type_Firm,
  postCode,
  address,
  EDRPOU,
  ibanOwn,
  ibanGazBank,
  firstPerson__Position,
  firstPerson__Position_RoditelPadej,
  firstPerson__Full_Name,
  firstPerson__Full_Name_RoditelPadej,
  firstPerson__Short_Name,
  whichActsOnTheBasis,
  issuedBy,
  taxPayerOn,
  certificate_PDV,
  email,
  phoneNumber,
  who_is
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Firm,
    short_name__Firm,
    type_Firm,
    postCode,
    address,
    EDRPOU,
    ibanOwn,
    ibanGazBank,
    firstPerson__Position,
    firstPerson__Position_RoditelPadej,
    firstPerson__Full_Name,
    firstPerson__Full_Name_RoditelPadej,
    firstPerson__Short_Name,
    whichActsOnTheBasis,
    issuedBy,
    taxPayerOn,
    certificate_PDV,
    email,
    phoneNumber,
    who_is,
  });

  try {
    const { data } = await axios.put(
      `/api/reference-data/firm/${id__FIRM}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__FIRM,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__FIRM());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__FIRM = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/firm`);
    dispatch({ type: GET_ALL__FIRM, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__FIRM = (id__FIRM) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/reference-data/firm/${id__FIRM}`);

    dispatch({
      type: GET_ONE__FIRM,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__FIRM = (id__FIRM) => async (dispatch) => {
  try {
    await axios.delete(`/api/reference-data/firm/${id__FIRM}`);
    dispatch({
      type: DELETE__FIRM,
      payload: id__FIRM,
    });
    dispatch(getAll__FIRM());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
