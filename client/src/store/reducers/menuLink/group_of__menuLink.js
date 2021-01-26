import {
  ADD__GROUP_OF_MENU_LINK,
  UPDATE__GROUP_OF_MENU_LINK,
  GET_ALL__GROUP_OF_MENU_LINK,
  GET_ONE__GROUP_OF_MENU_LINK,
  DELETE__GROUP_OF_MENU_LINK,
} from '../../actions/types';

const initialState = {
  array__GROUP_OF_MENU_LINK: [],
  one__GROUP_OF_MENU_LINK: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__GROUP_OF_MENU_LINK:
      return {
        ...state,
        array__GROUP_OF_MENU_LINK: state.array__GROUP_OF_MENU_LINK.push(
          payload
        ),
        loading: false,
      };

    case UPDATE__GROUP_OF_MENU_LINK:
      return {
        ...state,
        array__GROUP_OF_MENU_LINK: state.array__GROUP_OF_MENU_LINK.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__GROUP_OF_MENU_LINK:
      return {
        ...state,
        array__GROUP_OF_MENU_LINK: payload,
        loading: false,
      };

    case GET_ONE__GROUP_OF_MENU_LINK:
      return {
        ...state,
        one__GROUP_OF_MENU_LINK: payload,
        loading: false,
      };

    case DELETE__GROUP_OF_MENU_LINK:
      return {
        ...state,
        array__GROUP_OF_MENU_LINK: state.array__GROUP_OF_MENU_LINK.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
