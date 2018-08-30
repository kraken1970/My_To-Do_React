import React, { Component } from "react";

class TaskCreator extends Component {
  constructor(props) {
    super(props);
    this.newIndex = 2;
  }

  createNewTask = e => {
    if (e.key === "Enter") {
      const newTask = {
        title: e.target.value,
        id: this.newIndex
      };

      this.props.onCreate(newTask);
      e.target.value = "";
      this.newIndex++;
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
