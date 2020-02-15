import React, { Component } from 'react'
import "./style.css";
import axios from 'axios';

class NewsThumbnail extends Component {

  state = {

  }

  getNewsXML() {
    
  }

  async componentDidMount () {

  }

  render() {
    return (
      <div className="news-thumbnail-item">
        <div className="news-thumbnail-header">
          <h1 className="">News</h1>
        </div>
        <div className="news-thumbnail-headline">
          <h2>HEADLINE</h2>
        </div>
        <div className="news-thumbnail-article">
          <p>ARTICLE</p>
        </div>
      </div>
    )
  }
}

export default NewsThumbnail;