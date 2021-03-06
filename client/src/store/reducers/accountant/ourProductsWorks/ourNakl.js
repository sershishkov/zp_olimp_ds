import {
  ADD__OUR_NAKL,
  UPDATE__OUR_NAKL,
  GET_ALL__OUR_NAKL,
  GET_ONE__OUR_NAKL,
  DELETE__OUR_NAKL,
} from '../../../actions/types';

const initialState = {
  array__OUR_NAKL: [],
  one__OUR_NAKL: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__OUR_NAKL:
      return {
        ...state,
        array__OUR_NAKL: state.array__OUR_NAKL.push(payload),
        loading: false,
      };

    case UPDATE__OUR_NAKL:
      return {
        ...state,
        array__OUR_NAKL: state.array__OUR_NAKL.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__OUR_NAKL:
      return {
        ...state,
        array__OUR_NAKL: payload,
        loading: false,
      };

    case GET_ONE__OUR_NAKL:
      return {
        ...state,
        one__OUR_NAKL: payload,
        loading: false,
      };

    case DELETE__OUR_NAKL:
      return {
        ...state,
        array__OUR_NAKL: state.array__OUR_NAKL.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
