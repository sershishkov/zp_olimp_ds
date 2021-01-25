import axios from 'axios';
import { setAlert } from '../../alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../../types';
import setAuthToken from '../../../../utils/setAuthToken';

//Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get('/api/auth/me');
    console.log(data.user);
    dispatch({
      type: USER_LOADED,
      payload: data.user, //{ success: true,user: user,}
    });
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error')); //(error, colorOfalert)
    }

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register user
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const { data } = await axios.post('/api/auth/register', body, config);
    console.log(data);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data, //{ success: true, token }
    });

    dispatch(loadUser());
    dispatch(setAlert('Регистрация прошла успешно', 'success')); //(error, colorOfalert)
  } catch (err) {
    const error = err.response.data.error;
    // console.log(err);
    // console.log(err.response);
    // console.log(err.response.data);
    // console.log(error);

    if (error === 'Duplicate field value entered') {
      dispatch(setAlert('Такой пользователь уже зарегистрирован', 'error')); //(error, colorOfalert)
    } else if (error) {
      dispatch(setAlert(error, 'error')); //(error, colorOfalert)
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

//Login user
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const { data } = await axios.post('/api/auth/login', body, config);
    console.log(data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data, //{ success: true, token }
    });
    dispatch(loadUser());
    dispatch(setAlert('Вход успешый', 'success')); //(error, colorOfalert)
  } catch (err) {
    const error = err.response.data.error;
    // console.log(err);
    // console.log(err.response);
    // console.log(err.response.data);
    // console.log(error);
    if (error) {
      dispatch(setAlert(error, 'error')); //(error, colorOfalert)
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//LOGout
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/auth/logout'); //{success: true, data: {},}
    dispatch({ type: LOGOUT });
    dispatch(setAlert('Выход успешый', 'success')); //(error, colorOfalert)
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error')); //(error, colorOfalert)
    }
  }
};

// updatedetails, updatepassword
//Update user details
export const updatedetails = (name, email) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email });

  try {
    await axios.put('/api/auth/updatedetails', body, config); //{success: true, data: user,}
    dispatch({ type: LOGOUT });
    dispatch(setAlert('Обновление данных успешо', 'success')); //(error, colorOfalert)
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error')); //(error, colorOfalert)
    }
  }
};

//Update user password
export const updatepassword = (currentPassword, newPassword) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ currentPassword, newPassword });

  try {
    await axios.put('/api/auth/updatepassword', body, config); //{ success: true, token }
    dispatch({ type: LOGOUT });
    dispatch(setAlert('Пароль обнавлен успешо', 'success')); //(error, colorOfalert)
  } catch (err) {
    const error = err.response.data.error;
    if (error) {
      dispatch(setAlert(error, 'error')); //(error, colorOfalert)
    }
  }
};
