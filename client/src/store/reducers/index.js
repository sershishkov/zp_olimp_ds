import { combineReducers } from 'redux';
import nameOfPage from './nameOfPage';
import alert from './alert';
import auth from './user/auth/auth';
import adminUsers from './user/adminUser/adminUsers';
import menuLink from './menuLink/menuLink';
import group_of__menuLink from './menuLink/group_of__menuLink';
import worker from './referenceData/worker';
import unit from './referenceData/unit';
import typeFirm from './referenceData/typeFirm';
import serviceJob from './referenceData/serviceJob';
import product from './referenceData/product';
import inventar from './referenceData/inventar';
import instrument from './referenceData/instrument';
import groupServiceJob from './referenceData/groupServiceJob';
import groupProduct from './referenceData/groupProduct';
import groupExpense from './referenceData/groupExpense';
import firm from './referenceData/firm';
import expense from './referenceData/expense';
import equipment from './referenceData/equipment';

export default combineReducers({
  nameOfPage,
  alert,
  auth,
  adminUsers,

  menuLink,
  group_of__menuLink,

  worker,
  unit,
  typeFirm,
  serviceJob,
  product,
  inventar,
  instrument,
  groupServiceJob,
  groupProduct,
  groupExpense,
  firm,
  expense,
  equipment,
});
