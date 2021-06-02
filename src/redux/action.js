import {
  ADD_TODO,
  COMPLETED,
  DELETE_TODO,
  EDIT_TODO,
  GET_SAVED_TODOS,
  NOT_COMPLETED,
  REMOVE_ALL,
} from "./types";

export const addTodo = (job) => {
  return {
    type: ADD_TODO,
    data: job,
  };
};

export const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    data: id,
  };
};

export const editTodo = (editedId, job) => {
  return {
    type: EDIT_TODO,
    data: { editedId, job },
  };
};

export const getSavedTodos = (todos) => {
  return {
    type: GET_SAVED_TODOS,
    data: todos,
  };
};

export const removeAll = () => {
  return {
    type: REMOVE_ALL,
  };
};

export const completeTodo = (id) => {
  return {
    type: COMPLETED,
    data: id,
  };
};

export const unCompleteTodo = (id) => {
  return {
    type: NOT_COMPLETED,
    data: id,
  };
};
