import {
  ADD__EXPENSE,
  UPDATE__EXPENSE,
  GET_ALL__EXPENSE,
  GET_ONE__EXPENSE,
  DELETE__EXPENSE,
} from '../../../actions/types';

const initialState = {
  array__EXPENSE: [],
  one__EXPENSE: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__EXPENSE:
      return {
        ...state,
        array__EXPENSE: state.array__EXPENSE.push(payload),
        loading: false,
      };

    case UPDATE__EXPENSE:
      return {
        ...state,
        array__EXPENSE: state.array__EXPENSE.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__EXPENSE:
      return {
        ...state,
        array__EXPENSE: payload,
        loading: false,
      };

    case GET_ONE__EXPENSE:
      return {
        ...state,
        one__EXPENSE: payload,
        loading: false,
      };

    case DELETE__EXPENSE:
      return {
        ...state,
        array__EXPENSE: state.array__EXPENSE.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
