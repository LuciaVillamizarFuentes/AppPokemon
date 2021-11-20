export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_TODO":
      console.log([...state.ToDoList, payload]);
      return {
        ...state,
        ToDoList: [payload],
      };

    case "DELETE_TODO":
      console.log([...state.ToDoList, payload]);
      return {
        ...state,
        ToDoList: state.ToDoList.filter((e) => e != payload),
      };

    default:
      return state;
  }
};
