import React, { Component } from 'react'
import "./style.css";

class TasksThumbnail extends Component {

  state = {
    tasks: []
  }

  render() {
    const tasks = this.props.tasks.slice(0, 3); // Only render top 3
    return (
      <div className="tasks-thumbnail-item">
        <div className="tasks-thumbnail-header">
          <h1 className="">Tasks</h1>
        </div>
        <div className="tasks-thumbnail-content">
        {
          tasks.map((val, ind) => {
            return <li key={val._id}>{val.task} <span><input type="checkbox" checked={val.completed} disabled="disabled"/></span></li>
          })
        }
        </div>
      </div>
    )
  }
}

export default TasksThumbnail;