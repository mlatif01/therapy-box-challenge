import React, { Component } from 'react'
import axios from 'axios';
// import { Link, Redirect } from 'react-router-dom';
import NewsThumbnail from '../news-thumbnail/NewsThumbnail';
import "./style.css";

class Dashboard extends Component {

  state = {
    username: "",
    email: ""
  };


  handleChange = (e) => {
  }

  async componentDidMount () {
    const token = localStorage.getItem('token');
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${token}`
      }
    }
    try {
      const res = await axios.get('/api/users/getuser', headerConfig);
      if (res.status === 200) {
        // Set username
        this.setState({
          username: res.data.username,
          email: res.data.email
        });
        console.log(res.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  
  render() {
    const { username } = this.state;
    return (
      <React.Fragment>
        <div className="dashboard-header" value={username}>
          <h1>Good day {username}</h1>
        </div>
        <div className="dashboard-container">
          <NewsThumbnail />
          <NewsThumbnail />
          <NewsThumbnail />
          <NewsThumbnail />
          <NewsThumbnail />
          <NewsThumbnail />
        </div>
      </React.Fragment>

    )
  }
}


export default Dashboard;