import {
  ADD__UNIT,
  UPDATE__UNIT,
  GET_ALL__UNIT,
  GET_ONE__UNIT,
  DELETE__UNIT,
} from '../../actions/types';

const initialState = {
  array__UNIT: [],
  one__UNIT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__UNIT:
      return {
        ...state,
        array__UNIT: state.array__UNIT.push(payload),
        loading: false,
      };

    case UPDATE__UNIT:
      return {
        ...state,
        array__UNIT: state.array__UNIT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__UNIT:
      return {
        ...state,
        array__UNIT: payload,
        loading: false,
      };

    case GET_ONE__UNIT:
      return {
        ...state,
        one__UNIT: payload,
        loading: false,
      };

    case DELETE__UNIT:
      return {
        ...state,
        array__UNIT: state.array__UNIT.filter((item) => item._id !== payload),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
