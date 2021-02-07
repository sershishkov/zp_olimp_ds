import {
  ADD__PRODUCT,
  UPDATE__PRODUCT,
  GET_ALL__PRODUCT,
  GET_ONE__PRODUCT,
  DELETE__PRODUCT,
} from '../../actions/types';

const initialState = {
  array__PRODUCT: [],
  one__PRODUCT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__PRODUCT:
      return {
        ...state,
        array__PRODUCT: state.array__PRODUCT.push(payload),
        loading: false,
      };

    case UPDATE__PRODUCT:
      return {
        ...state,
        array__PRODUCT: state.array__PRODUCT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__PRODUCT:
      return {
        ...state,
        array__PRODUCT: payload,
        loading: false,
      };

    case GET_ONE__PRODUCT:
      return {
        ...state,
        one__PRODUCT: payload,
        loading: false,
      };

    case DELETE__PRODUCT:
      return {
        ...state,
        array__PRODUCT: state.array__PRODUCT.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
