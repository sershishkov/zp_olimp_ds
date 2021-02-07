import {
  ADD__GROUP_PRODUCT,
  UPDATE__GROUP_PRODUCT,
  GET_ALL__GROUP_PRODUCT,
  GET_ONE__GROUP_PRODUCT,
  DELETE__GROUP_PRODUCT,
} from '../../actions/types';

const initialState = {
  array__GROUP_PRODUCT: [],
  one__GROUP_PRODUCT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__GROUP_PRODUCT:
      return {
        ...state,
        array__GROUP_PRODUCT: state.array__GROUP_PRODUCT.push(payload),
        loading: false,
      };

    case UPDATE__GROUP_PRODUCT:
      return {
        ...state,
        array__GROUP_PRODUCT: state.array__GROUP_PRODUCT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__GROUP_PRODUCT:
      return {
        ...state,
        array__GROUP_PRODUCT: payload,
        loading: false,
      };

    case GET_ONE__GROUP_PRODUCT:
      return {
        ...state,
        one__GROUP_PRODUCT: payload,
        loading: false,
      };

    case DELETE__GROUP_PRODUCT:
      return {
        ...state,
        array__GROUP_PRODUCT: state.array__GROUP_PRODUCT.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
