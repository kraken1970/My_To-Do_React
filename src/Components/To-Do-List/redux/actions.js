export const c = {
  CHANGE_FILTER: "CHANGE_FILTER",
  PUT_TASK: "PUT_TASK",
  PUT_TASKS: "PUT_TASKS",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
  UPDATE_TASK: "UPDATE_TASK",
  DELETE_TASK: "DELETE_TASK"
};

export const putTaskCreator = task => {
  return {
    type: c.PUT_TASK,
    task: task
  };
};

export const putTasksActionCreator = tasks => {
  return {
    type: c.PUT_TASKS,
    tasks: tasks
  };
};

export const clearComletedCreator = () => {
  return {
    type: c.CLEAR_COMPLETED
  };
};

export const changeFilterCreator = newFilterValue => {
  return {
    type: c.CHANGE_FILTER,
    value: newFilterValue
  };
};

export const updateTaskCreator = ({ id, isDone, title }) => {
  return {
    type: c.UPDATE_TASK,
    id: id,
    isDone: isDone,
    title: title
  };
};

export const deleteTaskCreator = taskId => {
  return {
    type: c.DELETE_TASK,
    taskId: taskId
  };
};
