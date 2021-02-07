import {
  ADD__WORKER,
  UPDATE__WORKER,
  GET_ALL__WORKER,
  GET_ONE__WORKER,
  DELETE__WORKER,
} from '../../actions/types';

const initialState = {
  array__WORKER: [],
  one__WORKER: {},
  loading: true,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD__WORKER:
      return {
        ...state,
        array__WORKER: state.array__WORKER.push(payload),
        loading: false,
      };

    case UPDATE__WORKER:
      return {
        ...state,
        array__WORKER: state.array__WORKER.map((item) =>
          item._id === payload._id ? payload : item
        ),
        loading: false,
      };

    case GET_ALL__WORKER:
      return {
        ...state,
        array__WORKER: payload,
        loading: false,
      };

    case GET_ONE__WORKER:
      return {
        ...state,
        one__WORKER: payload,
        loading: false,
      };

    case DELETE__WORKER:
      return {
        ...state,
        array__WORKER: state.array__WORKER.filter(
          (item) => item._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default reducer;
