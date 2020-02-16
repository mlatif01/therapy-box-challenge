import React, { Component } from 'react'
import "./style.css";
import axios from 'axios';

class SportThumbnail extends Component {

  state = {
    teamName: "JUVENTUS"
  }

  render() {
    return (
      <div className="sport-thumbnail-item">
        <div className="sport-thumbnail-header">
          <h1 className="">Sport</h1>
        </div>
        <div className="sport-thumbnail-headline">
          <h2>{this.state.teamName}</h2>
        </div>
      </div>
    )
  }
}

export default SportThumbnail;