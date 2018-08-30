import React, { Component } from "react";
import ToDoList from "./Components/To-Do-List/ToDoList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <ToDoList />
      </div>
    );
  }
}

export default App;
