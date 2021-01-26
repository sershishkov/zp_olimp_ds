import { combineReducers } from 'redux';
import nameOfPage from './nameOfPage';
import alert from './alert';
import auth from './user/auth/auth';
import menuLink from './menuLink/menuLink';
import group_of__menuLink from './menuLink/group_of__menuLink';

export default combineReducers({
  nameOfPage,
  alert,
  auth,

  menuLink,
  group_of__menuLink,
});
