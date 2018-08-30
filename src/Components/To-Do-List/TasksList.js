import React, { Component } from "react";
import Task from "./Task";

class TasksList extends Component {
  render() {
    return (
      <ul className="tasks">
        {this.props.tasks.map((task, index) => {
          return (
            <Task
              task={task}
              updateCallback={this.props.onUpdate}
              deleteCallback={this.props.onDelete}
              key={task.id}
            />
          );
        })}
      </ul>
    );
  }
}

export default TasksList;
