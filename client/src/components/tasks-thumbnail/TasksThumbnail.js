import React, { Component } from 'react'
import "./style.css";
import axios from 'axios';

class TasksThumbnail extends Component {

  state = {
    tasks: []
  }

  render() {
    const tasks = this.props.tasks.slice(0, 4); // Only render top 3
    return (
      <div className="tasks-thumbnail-item">
        <div className="tasks-thumbnail-header">
          <h1 className="">Tasks</h1>
        </div>
        <div className="tasks-thumbnail-content">
        {
          tasks.map((val, ind) => {
            return <li key={ind}>{val} <span><input type="checkbox" disabled="disabled"/></span></li>
          })
        }
        </div>
      </div>
    )
  }
}

export default TasksThumbnail;