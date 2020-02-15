import React, { Component } from 'react'
import "./style.css";
import logo from './assets/Rain_icon.png';
import axios from 'axios';

class WeatherThumbnail extends Component {

  state = {
    logo: logo,
    temp: "",
    city: ""
  }

  async componentDidMount () {
    console.log(getGeoLocation());
    // Make api call to weather api -- Should add below in another function -- clean up
    const api_key = "d0a10211ea3d36b0a6423a104782130e";

    // make call to openweather map api to get weather info
    try {
      geoObj = await getGeoLocation();
      const res = await axios.get(`api.openweathermap.org/data/2.5/weather?lat=${geoObj.lat}&lon=${geoObj.lat}&appid=${api_key}`);
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
    return (
      <div className="thumbnail-item">
        <div className="thumbnail-header">
          <h1 className="">NEWS</h1>
        </div>
        <div className="thumbnail-icon">
          <img src={this.state.logo} alt=""/>
        </div>
        <div className="thumbnail-temp">
          <p>12 Degrees</p>
        </div>
        <div className="thumbnail-city">
          <p className="">London</p>
        </div>
      </div>
    )
  }
}

function getGeoLocation() {
  // get users current geo location
  if (navigator.geolocation.getCurrentPosition( (position)=> {
    const lon = position.coords.longitude;
    const lat = position.coords.latitude;
    const geoObj = {
      lon: lon,
      lat: lat
    }
    return geoObj;
  }));
  else {
    console.log("geolocation is not supported");
  }
}

export default WeatherThumbnail;