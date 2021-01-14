import { NAME_OF_PAGE } from '../actions/types';

const initialState = {
  pageName: '',
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case NAME_OF_PAGE:
      return {
        ...state,
        pageName: payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
