import {
  ADD__INSTRUMENT,
  UPDATE__INSTRUMENT,
  GET_ALL__INSTRUMENT,
  GET_ONE__INSTRUMENT,
  DELETE__INSTRUMENT,
} from '../../actions/types';

const initialState = {
  array__INSTRUMENT: [],
  one__INSTRUMENT: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__INSTRUMENT:
      return {
        ...state,
        array__INSTRUMENT: state.array__INSTRUMENT.push(payload),
        loading: false,
      };

    case UPDATE__INSTRUMENT:
      return {
        ...state,
        array__INSTRUMENT: state.array__INSTRUMENT.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__INSTRUMENT:
      return {
        ...state,
        array__INSTRUMENT: payload,
        loading: false,
      };

    case GET_ONE__INSTRUMENT:
      return {
        ...state,
        one__INSTRUMENT: payload,
        loading: false,
      };

    case DELETE__INSTRUMENT:
      return {
        ...state,
        array__INSTRUMENT: state.array__INSTRUMENT.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
