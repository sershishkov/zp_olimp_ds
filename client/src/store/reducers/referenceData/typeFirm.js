import {
  ADD__TYPE_FIRM,
  UPDATE__TYPE_FIRM,
  GET_ALL__TYPE_FIRM,
  GET_ONE__TYPE_FIRM,
  DELETE__TYPE_FIRM,
} from '../../actions/types';

const initialState = {
  array__TYPE_FIRM: [],
  one__TYPE_FIRM: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__TYPE_FIRM:
      return {
        ...state,
        array__TYPE_FIRM: state.array__TYPE_FIRM.push(payload),
        loading: false,
      };

    case UPDATE__TYPE_FIRM:
      return {
        ...state,
        array__TYPE_FIRM: state.array__TYPE_FIRM.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__TYPE_FIRM:
      return {
        ...state,
        array__TYPE_FIRM: payload,
        loading: false,
      };

    case GET_ONE__TYPE_FIRM:
      return {
        ...state,
        one__TYPE_FIRM: payload,
        loading: false,
      };

    case DELETE__TYPE_FIRM:
      return {
        ...state,
        array__TYPE_FIRM: state.array__TYPE_FIRM.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
