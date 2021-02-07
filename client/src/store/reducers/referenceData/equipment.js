import {
  ADD__EQUIPMENT,
  UPDATE__EQUIPMENT,
  GET_ALL__EQUIPMENT,
  GET_ONE__EQUIPMENT,
  DELETE__EQUIPMENT,
} from '../../actions/types';

const initialState = {
  array__EQUIPMENT: [],
  one__EQUIPMENT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__EQUIPMENT:
      return {
        ...state,
        array__EQUIPMENT: state.array__EQUIPMENT.push(payload),
        loading: false,
      };

    case UPDATE__EQUIPMENT:
      return {
        ...state,
        array__EQUIPMENT: state.array__EQUIPMENT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__EQUIPMENT:
      return {
        ...state,
        array__EQUIPMENT: payload,
        loading: false,
      };

    case GET_ONE__EQUIPMENT:
      return {
        ...state,
        one__EQUIPMENT: payload,
        loading: false,
      };

    case DELETE__EQUIPMENT:
      return {
        ...state,
        array__EQUIPMENT: state.array__EQUIPMENT.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
