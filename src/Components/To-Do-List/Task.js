import React, { Component } from "react";
import "./ToDoList.css";

class Task extends Component {
  constructor(props) {
    super(props);

    this.parentDeleteCallback = props.deleteCallback;
    this.parentUpdateCallback = props.updateCallback;
  }

  deleteTask = () => {
    this.parentDeleteCallback(this.props.task.id);
  };

  toggleTaskStatus = e => {
    let taskNew = { ...this.props.task };
    taskNew.isDone = !taskNew.isDone;
    this.parentUpdateCallback(taskNew);
  };

  render() {
    return (
      <li className={this.props.task.isDone ? "task done" : "task"}>
        <input
          type="checkbox"
          className="checTask"
          // checked={this.props.task.isDone}
          onClick={this.toggleTaskStatus}
        />
        {this.props.task.title}
        <span className="delete" onClick={this.deleteTask}>
          X
        </span>
      </li>
    );
  }
}

export default Task;
