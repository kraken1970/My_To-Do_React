import { c } from "./actions";

export function todoListReducer(oldState, action) {
  switch (action.type) {
    case c.CHANGE_FILTER:
      return {
        ...oldState,
        filter: action.value
      };
    case c.PUT_TASK:
      return {
        ...oldState,
        tasks: [...oldState.tasks, action.task]
      };
    case c.PUT_TASKS:
      return {
        ...oldState,
        tasks: [...oldState.tasks, ...action.tasks]
      };
    case c.CLEAR_COMPLETED:
      // var newState={...oldState}
      // newState.tasks=newState.tasks.filter(t => !t.isDone)
      // return newState
      // Или сокращенно:
      return {
        ...oldState,
        tasks: oldState.tasks.filter(t => !t.isDone)
      };
    case c.UPDATE_TASK:
      let newState = { ...oldState };
      newState.tasks = [...newState.tasks];
      newState.tasks.forEach((task, index) => {
        if (task.id === action.id) {
          newState.tasks[index] = {
            ...task,
            isDone: action.isDone,
            title: action.title
          };
        }
      });
      return newState;

    case c.DELETE_TASK:
      let newStateForDel = { ...oldState };
      newStateForDel.tasks = oldState.tasks.filter(item => {
        return item.id !== action.taskId;
      });
      return newStateForDel;

    default:
      if (!!oldState) return oldState;
      return {
        tasks: [],
        filter: "all"
      };
  }
}
