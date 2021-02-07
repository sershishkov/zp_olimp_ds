import {
  ADD__SERVICE_JOB,
  UPDATE__SERVICE_JOB,
  GET_ALL__SERVICE_JOB,
  GET_ONE__SERVICE_JOB,
  DELETE__SERVICE_JOB,
} from '../../actions/types';

const initialState = {
  array__SERVICE_JOB: [],
  one__SERVICE_JOB: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__SERVICE_JOB:
      return {
        ...state,
        array__SERVICE_JOB: state.array__SERVICE_JOB.push(payload),
        loading: false,
      };

    case UPDATE__SERVICE_JOB:
      return {
        ...state,
        array__SERVICE_JOB: state.array__SERVICE_JOB.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__SERVICE_JOB:
      return {
        ...state,
        array__SERVICE_JOB: payload,
        loading: false,
      };

    case GET_ONE__SERVICE_JOB:
      return {
        ...state,
        one__SERVICE_JOB: payload,
        loading: false,
      };

    case DELETE__SERVICE_JOB:
      return {
        ...state,
        array__SERVICE_JOB: state.array__SERVICE_JOB.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
