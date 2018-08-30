import React, { Component } from "react";

class ToDoFooter extends Component {
  handleFilterChanged = e => {
    this.props.onFilterCenged(e.target.dataset.value);
  };

  render() {
    const { tasks, filter, clearCompleted } = this.props;
    return (
      <div className="todo_footer">
        <div>
          <span>{tasks.filter(t => !t.isDone).length} items left</span>
        </div>
        <div className="footer_buttons">
          <button
            className={filter === "all" ? "selected" : ""}
            data-value="all"
            onClick={this.handleFilterChanged}
          >
            All
          </button>
          <button
            className={filter === "active" ? "selected" : ""}
            data-value="active"
            onClick={this.handleFilterChanged}
          >
            Active
          </button>
          <button
            className={filter === "completed" ? "selected" : ""}
            data-value="completed"
            onClick={this.handleFilterChanged}
          >
            Completed
          </button>
        </div>
        <div>
          <span className="clearCompleted" onClick={clearCompleted}>
            Clear comleted
          </span>
        </div>
      </div>
    );
  }
}

export default ToDoFooter;
