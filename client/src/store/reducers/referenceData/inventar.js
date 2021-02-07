import {
  ADD__INVENTAR,
  UPDATE__INVENTAR,
  GET_ALL__INVENTAR,
  GET_ONE__INVENTAR,
  DELETE__INVENTAR,
} from '../../actions/types';

const initialState = {
  array__INVENTAR: [],
  one__INVENTAR: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__INVENTAR:
      return {
        ...state,
        array__INVENTAR: state.array__INVENTAR.push(payload),
        loading: false,
      };

    case UPDATE__INVENTAR:
      return {
        ...state,
        array__INVENTAR: state.array__INVENTAR.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__INVENTAR:
      return {
        ...state,
        array__INVENTAR: payload,
        loading: false,
      };

    case GET_ONE__INVENTAR:
      return {
        ...state,
        one__INVENTAR: payload,
        loading: false,
      };

    case DELETE__INVENTAR:
      return {
        ...state,
        array__INVENTAR: state.array__INVENTAR.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
