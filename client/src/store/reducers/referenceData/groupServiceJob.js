import {
  ADD__GROUP_SERVICE_JOB,
  UPDATE__GROUP_SERVICE_JOB,
  GET_ALL__GROUP_SERVICE_JOB,
  GET_ONE__GROUP_SERVICE_JOB,
  DELETE__GROUP_SERVICE_JOB,
} from '../../actions/types';

const initialState = {
  array__GROUP_SERVICE_JOB: [],
  one__GROUP_SERVICE_JOB: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__GROUP_SERVICE_JOB:
      return {
        ...state,
        array__GROUP_SERVICE_JOB: state.array__GROUP_SERVICE_JOB.push(payload),
        loading: false,
      };

    case UPDATE__GROUP_SERVICE_JOB:
      return {
        ...state,
        array__GROUP_SERVICE_JOB: state.array__GROUP_SERVICE_JOB.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__GROUP_SERVICE_JOB:
      return {
        ...state,
        array__GROUP_SERVICE_JOB: payload,
        loading: false,
      };

    case GET_ONE__GROUP_SERVICE_JOB:
      return {
        ...state,
        one__GROUP_SERVICE_JOB: payload,
        loading: false,
      };

    case DELETE__GROUP_SERVICE_JOB:
      return {
        ...state,
        array__GROUP_SERVICE_JOB: state.array__GROUP_SERVICE_JOB.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
