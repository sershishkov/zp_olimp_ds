import {
  ADD__GROUP_EXPENSE,
  UPDATE__GROUP_EXPENSE,
  GET_ALL__GROUP_EXPENSE,
  GET_ONE__GROUP_EXPENSE,
  DELETE__GROUP_EXPENSE,
} from '../../actions/types';

const initialState = {
  array__GROUP_EXPENSE: [],
  one__GROUP_EXPENSE: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__GROUP_EXPENSE:
      return {
        ...state,
        array__GROUP_EXPENSE: state.array__GROUP_EXPENSE.push(payload),
        loading: false,
      };

    case UPDATE__GROUP_EXPENSE:
      return {
        ...state,
        array__GROUP_EXPENSE: state.array__GROUP_EXPENSE.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__GROUP_EXPENSE:
      return {
        ...state,
        array__GROUP_EXPENSE: payload,
        loading: false,
      };

    case GET_ONE__GROUP_EXPENSE:
      return {
        ...state,
        one__GROUP_EXPENSE: payload,
        loading: false,
      };

    case DELETE__GROUP_EXPENSE:
      return {
        ...state,
        array__GROUP_EXPENSE: state.array__GROUP_EXPENSE.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
