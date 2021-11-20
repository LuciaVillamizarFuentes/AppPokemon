import React, { useReducer } from "react";

import ToDoReducer from "./ToDoReducer";

import ToDoContext from "./ToDoContext";

const ToDoState = (props) => {
  const initialState = {
    ToDoList: [],
  };

  const [state, dispatch] = useReducer(ToDoReducer, initialState);

  const setToDo = (todo) => {
    dispatch({
      type: "SET_TODO",
      payload: todo,
    });
  };

  const deleteTodo = (todo) => {
    dispatch({
      type: "DELETE_TODO",
      payload: todo,
    });
  };


  return (
    <ToDoContext.Provider
      value={{
        ToDoList: state.ToDoList,
        setToDo,
        deleteTodo
      }}
    >
      {props.children}
    </ToDoContext.Provider>
  );
};
export default ToDoState;
