import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__MENU_LINK,
  UPDATE__MENU_LINK,
  GET_ALL__MENU_LINK,
  GET_ONE__MENU_LINK,
  DELETE__MENU_LINK,
} from '../types';

export const add__MENU_LINK = (
  name__MenuLink,
  linkToPage,
  allowedRoles,
  group_Of_Page
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__MenuLink,
    linkToPage,
    allowedRoles,
    group_Of_Page,
  });

  try {
    const { data } = await axios.post(`/api/menu-link`, body, config);

    dispatch({
      type: ADD__MENU_LINK,
      payload: data.data, //new obj
    });

    dispatch(getAll__MENU_LINK());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__MENU_LINK = (
  id__MENU_LINK,
  name__MenuLink,
  linkToPage,
  allowedRoles,
  group_Of_Page
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__MenuLink,
    linkToPage,
    allowedRoles,
    group_Of_Page,
  });

  try {
    const { data } = await axios.put(
      `/api/menu-link/${id__MENU_LINK}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__MENU_LINK,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__MENU_LINK());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__MENU_LINK = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/menu-link`);
    dispatch({ type: GET_ALL__MENU_LINK, payload: data.data }); // sorted array
    // console.log(data.data);
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__MENU_LINK = (id__MENU_LINK) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/menu-link/${id__MENU_LINK}`);

    dispatch({
      type: GET_ONE__MENU_LINK,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__MENU_LINK = (id__MENU_LINK) => async (dispatch) => {
  try {
    await axios.delete(`/api/menu-link/${id__MENU_LINK}`);
    dispatch({
      type: DELETE__MENU_LINK,
      payload: id__MENU_LINK,
    });
    dispatch(getAll__MENU_LINK());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
