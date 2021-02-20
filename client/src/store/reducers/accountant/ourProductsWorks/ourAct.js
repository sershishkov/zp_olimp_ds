import {
  ADD__OUR_ACT,
  UPDATE__OUR_ACT,
  GET_ALL__OUR_ACT,
  GET_ONE__OUR_ACT,
  DELETE__OUR_ACT,
} from '../../../actions/types';

const initialState = {
  array__OUR_ACT: [],
  one__OUR_ACT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__OUR_ACT:
      return {
        ...state,
        array__OUR_ACT: state.array__OUR_ACT.push(payload),
        loading: false,
      };

    case UPDATE__OUR_ACT:
      return {
        ...state,
        array__OUR_ACT: state.array__OUR_ACT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__OUR_ACT:
      return {
        ...state,
        array__OUR_ACT: payload,
        loading: false,
      };

    case GET_ONE__OUR_ACT:
      return {
        ...state,
        one__OUR_ACT: payload,
        loading: false,
      };

    case DELETE__OUR_ACT:
      return {
        ...state,
        array__OUR_ACT: state.array__OUR_ACT.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
