import React, { Component } from "react";

class TaskCreator extends Component {
  constructor(props) {
    super(props);
    this.newIndex = 2;
  }

  createNewTask = e => {
    if (e.key === "Enter") {
      const data = new URLSearchParams();
      data.append("widgetId", 789789);
      data.append("title", e.currentTarget.value);
      const newTaskInput = e.currentTarget;

      fetch("https://repetitora.net/api/JS/Tasks", {
        method: "POST",
        body: data,
        headers: {
          "content-type": "application/x-www-form-urlencoded: charset=UTF-8",
          accept: "application/json"
        },
        mode: "cors"
      })
        .then(result => result.json())
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
      //если заработает-убрать:
      // const newTask = {
      //   title: e.target.value,
      //   id: this.newIndex
      // };

      // this.props.onCreate(newTask);
      // e.target.value = "";
      // this.newIndex++;
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
