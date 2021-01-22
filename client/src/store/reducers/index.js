import { combineReducers } from 'redux';
import nameOfPage from './nameOfPage';
import alert from './alert';
import auth from './user/auth/auth';

export default combineReducers({
  nameOfPage,
  alert,
  auth,
});
