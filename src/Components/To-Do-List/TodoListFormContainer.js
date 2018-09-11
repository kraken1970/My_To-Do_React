import React, { Component } from "react";
import { createTask } from "./Services";

export default class TodoListFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      isWating: false
    };
  }

  changeTitle(title) {
    this.setState({ title: title });
  }

  createTask(title) {
    this.setState({ isWating: true, title: title });
    createTask(title, 789789)
      .then(data => {
        const newTask = {
          title: data.task.title,
          id: data.task.id,
          isDone: data.task.done
        };

        this.props.onCreate(newTask);
        this.setState({ isWating: false, title: "" });
      })
      .catch(error => console.log("error", error));
  }

  render() {
    const { title, isWating } = this.state;
    return (
      <TodoListFormPresentation
        createTask={this.createTask.bind(this)}
        title={title}
        isWating={isWating}
        changeTitle={this.changeTitle.bind(this)}
      />
    );
  }
}

const TodoListFormPresentation = props => {
  const createNewTask = e => {
    if (e.key === "Enter") {
      const newTaskInput = e.currentTarget;
      props.createTask(newTaskInput.value);
      newTaskInput.value = ""; //влепил сам
    }
  };

  const changeTitle = e => {
    props.changeTitle(e.target.value);
  };

  return (
    <div className="header">
      <input
        onKeyPress={createNewTask}
        onKeyUp={changeTitle}
        value={this.title} //props.title
        disabled={props.isWating}
      />
    </div>
  );
};

// class TaskCreator extends Component {
//   createNewTask = e => {
//     if (e.key === "Enter") {
//       const newTaskInput = e.currentTarget;

//       createTask(newTaskInput.value, 789789)
//         .then(data => {
//           const newTask = {
//             title: data.task.title,
//             id: data.task.id,
//             isDone: data.task.done
//           };

//           this.props.onCreate(newTask);
//           newTaskInput.value = "";
//         })
//         .catch(error => console.log("error", error));
//     }
//   };

//   render() {
//     return (
//       <div className="header">
//         <input type="text" onKeyPress={this.createNewTask} />
//       </div>
//     );
//   }
// }

// export default TaskCreator;
