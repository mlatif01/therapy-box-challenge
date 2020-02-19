import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import BackButton from '../utils/BackButton';
import "./style.css";
import axios from 'axios';
import auth from '../auth/auth';

class Tasks extends Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      task: '',
      goBack: false
    }

    // set bindings
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitTask = this.submitTask.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  setGoBack = (e) => {
    this.setState({
      goBack: true
    })
  }

  submitTask = async (e) => {
    let tasks = this.state.tasks;
    let task = this.state.task;
    if (task !== "") {
      tasks.push(task)
      this.setState({ tasks: tasks, task: ""});
    } else {
      alert('Please enter a name for the task');
    }
    // post entire array to db 
    const token = localStorage.getItem('token');
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${token}`
      }
    }
    const taskObj = {
      tasks: this.state.tasks
    }
    try {
      const res = await axios.post('/api/tasks', taskObj, headerConfig);
      if (res.status === 200) {
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  async componentDidMount() {
    // get all the tasks for the current user
    const token = localStorage.getItem('token');
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${token}`
      }
    }
    const taskData = this.props.tasks;
    if (taskData) {
      this.setState({
        tasks: taskData
      });
    }
    // display and mark the box as checked/unchecked using checked property

  }

  render() {
    if (this.state.goBack) {
      return <Redirect to='/dashboard' />;
    }
    if (auth.isAuthenticated()) {
    return (
      <div className="tasks-item">
        <div className="tasks-header">
          <h1>Tasks</h1>
          <BackButton triggerParentUpdate={this.setGoBack}/>
        </div>

        <div className="tasks-content">
          <input placeholder="Add a new task" className="form-control" type="text" name="task" value={this.state.task} onChange={this.handleInputChange}/>
          <button className="tasks-btn" onClick={this.submitTask}></button>

          {this.state.tasks.map((task, ind) => {
            return (
              <div className="tasks-item" key={ind}>
                <input className="form-control" type="text" name="task" value={task}/>
                <input type="checkbox"/>
              </div>
            )
          })}
        </div>
      </div>
    ) } else {
      return <Redirect to={
        {
          pathname: '/',
          state: {
            from: this.props.location
          }
        }
      } />
    }
  } 
}

export default Tasks;