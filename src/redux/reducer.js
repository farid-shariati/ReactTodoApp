import {
  ADD_TODO,
  COMPLETED,
  DELETE_TODO,
  EDIT_TODO,
  GET_SAVED_TODOS,
  NOT_COMPLETED,
  REMOVE_ALL,
} from "./types";

const initialState = {
  todos: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO :
      const items = [
        ...state.todos,
        { job: action.data, id: Math.random(), isComplete: false },
      ];
      localStorage.setItem("list", JSON.stringify(items));
      return {
        todos: items,
      };
    case DELETE_TODO :
      const newTodos = state.todos.filter((item) => item.id !== action.data);
      localStorage.setItem("list", JSON.stringify(newTodos));
      return {
        todos: newTodos,
      };
    case EDIT_TODO :
      const temp = state.todos.map((item) =>
        item.id === action.data.editedId
          ? { ...item, job: action.data.job }
          : item
      );
      localStorage.setItem("list", JSON.stringify(temp));
      return {
        todos: temp,
      };
    case GET_SAVED_TODOS:
      return {
        todos: action.data,
      };
    case REMOVE_ALL:
      return {
        todos: [],
      };
    case COMPLETED:
      const tempItems = state.todos.map((item) =>
        item.id === action.data ? { ...item, isComplete: true } : item
      );
      localStorage.setItem("list", JSON.stringify(tempItems));
      return {
        todos: tempItems,
      };
    case NOT_COMPLETED:
      const newItems = state.todos.map((item) =>
        item.id === action.data ? { ...item, isComplete: false } : item
      );
      localStorage.setItem("list", JSON.stringify(newItems));
      return {
        todos: newItems,
      };
    default:
      return state;
  }
};
