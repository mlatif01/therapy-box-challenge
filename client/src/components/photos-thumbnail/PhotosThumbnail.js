import React, { Component } from 'react'
import "./style.css";
import axios from 'axios';
import pictureFrame from './assets/Add_picture.png';

class PhotosThumbnail extends Component {

  state = {

  }

  render() {
    return (
      <div className="photos-thumbnail-item">
        <div className="photos-thumbnail-header">
          <h1 className="">Photos</h1>
        </div>
        <div className="photos-thumbnail-group">
          <div className="photos-thumbnail-pic">
          </div>
          <div className="photos-thumbnail-pic">
          </div>
          <div className="photos-thumbnail-pic">
          </div>
          <div className="photos-thumbnail-pic">
          </div>
        </div>
      </div>
    )
  }
}

export default PhotosThumbnail;