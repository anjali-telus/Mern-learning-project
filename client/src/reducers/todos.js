import { GET_TODO, TODO_ERROR, ADD_TODO } from "../actions/types";

const initialState = {
  // todoList: [],
  // todo: null,
  // loading: true,
  // error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_TODO:
      return {
        ...state
        // todos: [...state.todos, payload],
        // loading: false,
      };
    case GET_TODO:
      return {
        ...state,
        // todos: payload,
        loading: false,
      };
    case TODO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default: {
      return state;
    }
  }
}
