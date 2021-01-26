import axios from 'axios';
import { setAlert } from '../alert';

import {
  ADD__GROUP_OF_MENU_LINK,
  UPDATE__GROUP_OF_MENU_LINK,
  GET_ALL__GROUP_OF_MENU_LINK,
  GET_ONE__GROUP_OF_MENU_LINK,
  DELETE__GROUP_OF_MENU_LINK,
} from '../types';

export const add__GROUP_OF_MENU_LINK = (
  name__Group_MenuLink,

  allowedRoles
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_MenuLink,
    allowedRoles,
  });

  try {
    const { data } = await axios.post(`/api/group-of-menu-link`, body, config);

    dispatch({
      type: ADD__GROUP_OF_MENU_LINK,
      payload: data.data, //new obj
    });

    dispatch(getAll__GROUP_OF_MENU_LINK());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const update__GROUP_OF_MENU_LINK = (
  id__GROUP_OF_MENU_LINK,
  name__Group_MenuLink,
  allowedRoles
) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({
    name__Group_MenuLink,
    allowedRoles,
  });

  try {
    const { data } = await axios.put(
      `/api/group-of-menu-link/${id__GROUP_OF_MENU_LINK}`,
      body,
      config
    );

    dispatch({
      type: UPDATE__GROUP_OF_MENU_LINK,
      payload: data.data, //updated  obj
    });

    dispatch(getAll__GROUP_OF_MENU_LINK());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getAll__GROUP_OF_MENU_LINK = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/group-of-menu-link`);
    dispatch({ type: GET_ALL__GROUP_OF_MENU_LINK, payload: data.data }); // sorted array
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const getOne__GROUP_OF_MENU_LINK = (id__GROUP_OF_MENU_LINK) => async (
  dispatch
) => {
  try {
    const { data } = await axios.get(
      `/api/group-of-menu-link/${id__GROUP_OF_MENU_LINK}`
    );

    dispatch({
      type: GET_ONE__GROUP_OF_MENU_LINK,
      payload: data.data, //obj
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};

export const delete__GROUP_OF_MENU_LINK = (id__GROUP_OF_MENU_LINK) => async (
  dispatch
) => {
  try {
    await axios.delete(`/api/menu-link/${id__GROUP_OF_MENU_LINK}`);
    dispatch({
      type: DELETE__GROUP_OF_MENU_LINK,
      payload: id__GROUP_OF_MENU_LINK,
    });
    dispatch(getAll__GROUP_OF_MENU_LINK());
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error', 2500));
    }
  }
};
