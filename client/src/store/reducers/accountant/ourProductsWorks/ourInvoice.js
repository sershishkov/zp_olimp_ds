import {
  ADD__OUR_INVOICE,
  UPDATE__OUR_INVOICE,
  GET_ALL__OUR_INVOICE,
  GET_ONE__OUR_INVOICE,
  DELETE__OUR_INVOICE,
} from '../../../actions/types';

const initialState = {
  array__OUR_INVOICE: [],
  one__OUR_INVOICE: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__OUR_INVOICE:
      return {
        ...state,
        array__OUR_INVOICE: state.array__OUR_INVOICE.push(payload),
        loading: false,
      };

    case UPDATE__OUR_INVOICE:
      return {
        ...state,
        array__OUR_INVOICE: state.array__OUR_INVOICE.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__OUR_INVOICE:
      return {
        ...state,
        array__OUR_INVOICE: payload,
        loading: false,
      };

    case GET_ONE__OUR_INVOICE:
      return {
        ...state,
        one__OUR_INVOICE: payload,
        loading: false,
      };

    case DELETE__OUR_INVOICE:
      return {
        ...state,
        array__OUR_INVOICE: state.array__OUR_INVOICE.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
