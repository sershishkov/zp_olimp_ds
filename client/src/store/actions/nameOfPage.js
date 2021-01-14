import { NAME_OF_PAGE } from './types';

export const setNameOfPage = (pageName) => (dispatch) => {
  console.log(pageName);
  dispatch({
    type: NAME_OF_PAGE,
    payload: pageName,
  });
};
