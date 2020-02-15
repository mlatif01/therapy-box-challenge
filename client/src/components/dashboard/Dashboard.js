import React, { Component } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./style.css";
import WeatherThumbnail from '../weather-thumbnail/WeatherThumbnail';
import NewsThumbnail from '../news-thumbnail/NewsThumbnail';

class Dashboard extends Component {

  state = {
    username: "",
    email: "",
    newsData: {
      headline: "",
      article: "",
      image: ""
    }
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
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  // update news data passed from child (NewsThumbnail) to parent state (Dashboard)
  updateNewsData = (headline, article, image) => {
    this.setState({
      newsData: {
        headline: headline,
        article: article,
        image: image
      }
    })
    console.log(this.state);
  }
  
  render() {
    const { username } = this.state;
    return (
      <React.Fragment>
        <div className="dashboard-header" value={username}>
          <h1>Good day {username}</h1>
        </div>
        <div className="dashboard-container">
          <WeatherThumbnail />
          <Link 
            to= {{
              pathname: '/news',
              state: {
                newsData: this.state.newsData
              }
            }}
            className="news-link"><NewsThumbnail triggerParentUpdate={this.updateNewsData}/></Link>
          <WeatherThumbnail />
          <WeatherThumbnail />
          <WeatherThumbnail />
          <WeatherThumbnail />
        </div>
      </React.Fragment>

    )
  }
}


export default Dashboard;