import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import axios from 'axios';
import auth from './components/auth/auth';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import News from './components/news/News';
import Sport from './components/sport/Sport';
import Tasks from './components/tasks/Tasks';
import Photos from './components/photos/Photos';


class App extends Component {

  state = {
    sportData: {
      teamName: ''
    },
    tasksData: {
      tasks: []
    }
  }

  getTeamName = async () => {
    // get favourite team name from api
    try {
      const res = await axios.get('/api/news/sport/team', {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      });
      if (res.status === 200) {
        // set teamName
        const teamName = res.data.team;
        this.setState({
          sportData: {
            teamName: res.data.team || ""
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.getTasksData();
    // this.getTeamName();
  }

  // Get tasks data in App so we can pass as prop to Tasks & Dashboard components
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
          tasks: [...res.data.tasks] || ""
        }
      });
    }
    console.log(this.state.tasksData.tasks);
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
  updateTasksData = () => {
    this.getTasksData();
  }

  notFoundStyle = {
    margin: '10rem',
    color: '#8b0000'
  }

  render() {
    // Called once in app
    toast.configure({autoClose: 2000, draggable: false});
    const sportBadRequest = () => toast.error('Team is invalid');
    const sportGoodRequest = () => toast.success('Team has been updated');
    const loginGoodRequest = () => toast.success('Logged in Successfully', {
      position: toast.POSITION.TOP_LEFT
    });
    const loginBadRequest = () => toast.error('Invalid Credentials');
    const registerGoodRequest = () => toast.success('Registered Successfully');
    const registerBadRequest = () => toast.error('Registration Unsuccessful');

    return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route
              exact
              path="/(login|)/"
              render={(props) => <Login {...props} 
              loginGoodRequest={loginGoodRequest} 
              loginBadRequest={loginBadRequest} />} 
            />
            <Route path="/register"
              render={(props) => <Register {...props}
              registerGoodRequest={registerGoodRequest}
              registerBadRequest={registerBadRequest}/>}
            />
            <Route path="/dashboard"
              render={(props) => <Dashboard {...props} teamName={this.state.sportData.teamName} tasks={this.state.tasksData.tasks}
              getTeamName={this.getTeamName} getTasksData={this.getTasksData}/>  }
            />
            <Route path="/news" component={News} />
            <Route path="/sport"
              render={(props) => <Sport {...props} sportGoodRequest={sportGoodRequest} sportBadRequest={sportBadRequest} getTeamName={this.getTeamName}
              teamName={this.state.sportData.teamName} triggerParentUpdate={this.updateSportData}/>} />
            <Route path="/photos" component={Photos}/>
            <Route path="/tasks"
              render={(props) => <Tasks {...props} triggerParentUpdate={this.updateTasksData} tasks={this.state.tasksData.tasks} getTasksData={this.getTasksData}/>} />
            <Route path="*" component={() => <h1 style={this.notFoundStyle}>404 Not Found</h1>} />
          </Switch>
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
