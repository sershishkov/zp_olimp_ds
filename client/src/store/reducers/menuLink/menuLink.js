import {
  ADD__MENU_LINK,
  UPDATE__MENU_LINK,
  GET_ALL__MENU_LINK,
  GET_ONE__MENU_LINK,
  DELETE__MENU_LINK,
} from '../../actions/types';

const initialState = {
  array__MENU_LINK: [],
  one__MENU_LINK: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__MENU_LINK:
      return {
        ...state,
        array__MENU_LINK: state.array__MENU_LINK.push(payload),
        loading: false,
      };

    case UPDATE__MENU_LINK:
      return {
        ...state,
        array__MENU_LINK: state.array__MENU_LINK.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__MENU_LINK:
      return {
        ...state,
        array__MENU_LINK: payload,
        loading: false,
      };

    case GET_ONE__MENU_LINK:
      return {
        ...state,
        one__MENU_LINK: payload,
        loading: false,
      };

    case DELETE__MENU_LINK:
      return {
        ...state,
        array__MENU_LINK: state.array__MENU_LINK.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
