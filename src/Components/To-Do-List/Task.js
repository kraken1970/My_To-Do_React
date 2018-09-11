import React, { Component } from "react";
import { updateTask, deleteTask } from "./Services";
import "./ToDoList.css";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      title: props.task.title
    };
    this.parentDeleteCallback = props.deleteCallback;
    this.parentUpdateCallback = props.updateCallback;
  }

  deleteTask = e => {
    deleteTask(789789, this.props.task.id).then(data => {
      this.parentDeleteCallback(this.props.task.id);
    });
  };

  toggleTaskStatus = e => {
    let task = {
      ...this.props.task
    };
    task.isDone = !task.isDone;

    updateTask(789789, task.id, null, task.isDone).then(data => {
      this.setState({
        editMode: false
      });
      this.parentUpdateCallback(task);
    });
  };

  goToEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  saveTitle = e => {
    const newTitle = e.target.value;
    const task = {
      ...this.props.task
    };
    task.title = newTitle;
    updateTask(789789, task.id, newTitle, null).then(data => {
      this.setState({
        editMode: false
      });
      this.parentUpdateCallback(task);
    });
  };

  changeTitle = e => {
    this.setState({
      title: e.target.value
    });
  };

  render() {
    const { isDone } = this.props.task;
    const { title } = this.state;
    let displayElement = "";
    if (this.state.editMode) {
      displayElement = (
        <input
          value={title}
          onChange={this.changeTitle}
          onBlur={this.saveTitle}
        />
      );
    } else {
      displayElement = <span onDoubleClick={this.goToEditMode}>{title}</span>;
    }
    return (
      <li className={isDone ? "task done" : "task"}>
        <input
          type="checkbox"
          className="checTask"
          checked={isDone}
          onClick={this.toggleTaskStatus}
        />
        {displayElement}
        <span className="delete" onClick={this.deleteTask}>
          X
        </span>
      </li>
    );
  }
}

export default Task;
