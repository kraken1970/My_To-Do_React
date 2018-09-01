import React, { Component } from "react";
import { createTask } from "./Services";

class TaskCreator extends Component {
  createNewTask = e => {
    if (e.key === "Enter") {
      const newTaskInput = e.currentTarget;

      createTask(newTaskInput.value, 789789)
        .then(data => {
          const newTask = {
            title: data.task.title,
            id: data.task.id,
            isDone: data.task.done
          };

          this.props.onCreate(newTask);
          newTaskInput.value = "";
        })
        .catch(error => console.log("error", error));
    }
  };

  render() {
    return (
      <div className="header">
        <input type="text" onKeyPress={this.createNewTask} />
      </div>
    );
  }
}

export default TaskCreator;
