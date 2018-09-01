import React, { Component } from "react";
import TaskCreator from "./TaskCreator";
import TasksList from "./TasksList";
import ToDoFooter from "./ToDoFooter";
import { getTasks } from "./Services";
import "./ToDoList.css";

class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: "all"
    };

    getTasks(789789)
      .then(tasksFromServer => {
        let tasks = tasksFromServer.map(itemFromserver => {
          return {
            id: itemFromserver.id,
            title: itemFromserver.title,
            isDone: itemFromserver.done
          };
        });

        this.setState({
          tasks: tasks
        });
      })
      .catch(error => console.log("error", error));
  }

  clearCompleted = () => {
    this.setState({
      tasks: this.state.tasks.filter(t => !t.isDone)
    });
  };

  changeFilter = filterValue => {
    this.setState({
      filter: filterValue
    });
  };

  putTaskToState = task => {
    this.setState({
      tasks: [...this.state.tasks, task]
    });
  };

  deleteTask = taskId => {
    this.setState({
      tasks: this.state.tasks.filter(item => {
        return item.id !== taskId;
      })
    });
  };

  updateTask = task => {
    const newTaskList = [...this.state.tasks];

    newTaskList.forEach(item => {
      if (item.id === task.id) {
        item.isDone = task.isDone;
        return;
      }
    });

    this.setState({
      tasks: newTaskList
    });
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
        <TaskCreator onCreate={this.putTaskToState} />
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
