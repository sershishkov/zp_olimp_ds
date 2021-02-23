import { combineReducers } from 'redux';
import nameOfPage from './nameOfPage';
import alert from './alert';
import auth from './user/auth/auth';
import adminUsers from './user/adminUser/adminUsers';

import worker from './referenceData/worker';
import unit from './referenceData/unit';
import typeFirm from './referenceData/typeFirm';
import serviceJob from './referenceData/serviceJob';
import product from './referenceData/product';
import groupServiceJob from './referenceData/groupServiceJob';
import groupProduct from './referenceData/groupProduct';
import groupExpense from './referenceData/groupExpense';
import firm from './referenceData/firm';

import expense from './accountant/expenses/expense';
import contract from './accountant/contract/contract';

import ourAct from './accountant/ourProductsWorks/ourAct';
import ourInvoice from './accountant/ourProductsWorks/ourInvoice';
import ourNakl from './accountant/ourProductsWorks/ourNakl';

export default combineReducers({
  nameOfPage,
  alert,
  auth,
  adminUsers,

  worker,
  unit,
  typeFirm,
  serviceJob,
  product,
  groupServiceJob,
  groupProduct,
  groupExpense,
  firm,

  expense,
  contract,

  ourAct,
  ourInvoice,
  ourNakl,
});
