import React, { Component } from 'react';
import './App.css';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import News from './components/news/News';

class App extends Component {

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
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/news" component={News} />
        </div>
      </div>
    </Router>
  );
  }
}

export default App;
