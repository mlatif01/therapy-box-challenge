import React, { Component } from 'react';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import News from './components/news/News';
import Sport from './components/sport/Sport';

class App extends Component {

  state = {
    sportData: {
      teamName: ''
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
            render={(props) => <Dashboard {...props} teamName={this.state.sportData.teamName}/>  }
          />
          <Route path="/news" component={News} />
          <Route path="/sport"
            render={(props) => <Sport {...props} triggerParentUpdate={this.updateSportData}/>} />
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
