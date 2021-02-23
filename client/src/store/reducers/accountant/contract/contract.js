import {
  ADD__CONTRACT,
  UPDATE__CONTRACT,
  GET_ALL__CONTRACT,
  GET_ONE__CONTRACT,
  DELETE__CONTRACT,
} from '../../../actions/types';

const initialState = {
  array__CONTRACT: [],
  one__CONTRACT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__CONTRACT:
      return {
        ...state,
        array__CONTRACT: state.array__CONTRACT.push(payload),
        loading: false,
      };

    case UPDATE__CONTRACT:
      return {
        ...state,
        array__CONTRACT: state.array__CONTRACT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__CONTRACT:
      return {
        ...state,
        array__CONTRACT: payload,
        loading: false,
      };

    case GET_ONE__CONTRACT:
      return {
        ...state,
        one__CONTRACT: payload,
        loading: false,
      };

    case DELETE__CONTRACT:
      return {
        ...state,
        array__CONTRACT: state.array__CONTRACT.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
