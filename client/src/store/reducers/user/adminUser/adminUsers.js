import {
  ADD__OUR_USER,
  UPDATE__OUR_USER,
  GET_ALL__OUR_USER,
  GET_ONE__OUR_USER,
  DELETE__OUR_USER,
} from '../../../actions/types';

const initialState = {
  array__OUR_USER: [],
  one__OUR_USER: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__OUR_USER:
      return {
        ...state,
        array__OUR_USER: state.array__OUR_USER.push(payload),
        loading: false,
      };

    case UPDATE__OUR_USER:
      return {
        ...state,
        array__OUR_USER: state.array__OUR_USER.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__OUR_USER:
      return {
        ...state,
        array__OUR_USER: payload,
        loading: false,
      };

    case GET_ONE__OUR_USER:
      return {
        ...state,
        one__OUR_USER: payload,
        loading: false,
      };

    case DELETE__OUR_USER:
      return {
        ...state,
        array__OUR_USER: state.array__OUR_USER.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
