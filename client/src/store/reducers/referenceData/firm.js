import {
  ADD__FIRM,
  UPDATE__FIRM,
  GET_ALL__FIRM,
  GET_ONE__FIRM,
  DELETE__FIRM,
} from '../../actions/types';

const initialState = {
  array__FIRM: [],
  one__FIRM: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__FIRM:
      return {
        ...state,
        array__FIRM: state.array__FIRM.push(payload),
        loading: false,
      };

    case UPDATE__FIRM:
      return {
        ...state,
        array__FIRM: state.array__FIRM.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__FIRM:
      return {
        ...state,
        array__FIRM: payload,
        loading: false,
      };

    case GET_ONE__FIRM:
      return {
        ...state,
        one__FIRM: payload,
        loading: false,
      };

    case DELETE__FIRM:
      return {
        ...state,
        array__FIRM: state.array__FIRM.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
