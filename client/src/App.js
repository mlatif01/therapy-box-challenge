import React, { Component } from 'react';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import axios from 'axios';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import News from './components/news/News';
import Sport from './components/sport/Sport';
import Tasks from './components/tasks/Tasks';


class App extends Component {

  state = {
    sportData: {
      teamName: 'Juventus'
    },
    tasksData: {
      tasks: []
    }
  }

  componentDidMount() {
    this.getTasksData();
  }

  // Get tasks data in App so we can pass as prop to Sports & Dashboard components
  getTasksData = async (e) => {
    // get all the tasks for the current user
    const token = localStorage.getItem('token');
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${token}`
      }
    }
    const res = await axios.get('/api/tasks', headerConfig);
    if (res.data.tasks) {
      this.setState({
        tasksData: {
          tasks: res.data.tasks
        }
      });
    }
}

  // update sport data passed from child (Sport) to parent state (App)
  updateSportData = (teamName) => {
    this.setState({
      sportData: {
        teamName: teamName
      }
    });
  }

  // update tasks data passed from child (Sport) to parent state (App)
  updateTasksData = (tasks) => {
    this.setState({
      tasksData: {
        tasks: tasks
      }
    });
  }

  render() {
    return (
    <Router>
      <div className="App">
        <div className="container">
          <Route
            exact
            path="/(login|)/"
            component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard"
            render={(props) => <Dashboard {...props} teamName={this.state.sportData.teamName} tasks={this.state.tasksData.tasks}/>  }
          />
          <Route path="/news" component={News} />
          <Route path="/sport"
            render={(props) => <Sport {...props} teamName={this.state.sportData.teamName} triggerParentUpdate={this.updateSportData}/>} />
            
            <Route path="/tasks"
            render={(props) => <Tasks {...props} tasks={this.state.tasksData.tasks}/>} />
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
