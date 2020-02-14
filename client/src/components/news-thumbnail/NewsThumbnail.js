import React, { Component } from 'react'
import "./style.css";
import logo from './assets/Rain_icon.png';

class NewsThumbnail extends Component {

  state = {
    logo: logo,
    temp: "",
    city: ""
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


export default NewsThumbnail;