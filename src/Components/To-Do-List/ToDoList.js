import React, { Component } from "react";
import { createStore } from "redux";
import TodoListFormContainer from "./TodoListFormContainer";
import TasksList from "./TasksList";
import ToDoFooter from "./ToDoFooter";
import { getTasks } from "./Services";
import { todoListReducer } from "./redux/reducers";
import {
  putTasksActionCreator,
  clearComletedCreator,
  changeFilterCreator,
  putTaskCreator,
  updateTaskCreator,
  deleteTaskCreator
} from "./redux/actions";
import "./ToDoList.css";

class ToDoList extends Component {
  constructor(props) {
    super(props);

    // var reducers = combineReducers({ todoListReducer });
    this.store = createStore(todoListReducer);
    let state = this.store.getState();

    this.state = state;

    this.store.subscribe(() => {
      let state = this.store.getState();
      this.setState(state);
    });

    getTasks(789789)
      .then(tasksFromServer => {
        let tasks = tasksFromServer.map(itemFromserver => {
          return {
            id: itemFromserver.id,
            title: itemFromserver.title,
            isDone: itemFromserver.done
          };
        });

        let action = putTasksActionCreator(tasks);

        this.store.dispatch(action);
      })
      .catch(error => console.log("error", error));
  }

  clearCompleted = () => {
    this.store.dispatch(clearComletedCreator);
  };

  changeFilter = filterValue => {
    this.store.dispatch(changeFilterCreator(filterValue));
  };

  putTaskToState = task => {
    this.store.dispatch(putTaskCreator(task));
  };

  deleteTask = taskId => {
    this.store.dispatch(deleteTaskCreator(taskId));
  };

  updateTask = task => {
    this.store.dispatch(updateTaskCreator(task));
  };

  render() {
    const { tasks, filter } = this.state;
    let filteredTasks = [];
    if (filter === "all") filteredTasks = tasks;
    if (filter === "active") filteredTasks = tasks.filter(t => !t.isDone);
    if (filter === "completed") filteredTasks = tasks.filter(t => t.isDone);

    return (
      <div className="todolist">
        <h3>To-Do List</h3>
        <TodoListFormContainer onCreate={this.putTaskToState} />
        <TasksList
          tasks={filteredTasks}
          onDelete={this.deleteTask}
          onUpdate={this.updateTask}
        />
        <ToDoFooter
          tasks={tasks}
          filter={filter}
          onFilterCenged={this.changeFilter}
          clearCompleted={this.clearCompleted}
        />
      </div>
    );
  }
}

export default ToDoList;
