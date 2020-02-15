import React, { Component } from 'react'
import "./style.css";
import imageBorder from './assets/Add_picture.png';
// import axios from 'axios';

class News extends Component {

  state = {
    headline: "headline",
    article: "article",
    image: ""
  }

  componentDidMount() {
    const {headline, article, image} = this.props.location.state.newsData;
    this.setState({
      headline: headline,
      article: article,
      image: image
    })
  }

  render() {
    return (
      <div className="news-item">
        <div className="news-header">
          <h1>News</h1>
          <img src={imageBorder} alt=""/>
        </div>
        <div className="news-headline">
          <h2>{this.state.headline}</h2>
        </div>
        <div className="news-article">
          <p>{this.state.article}</p>
        </div>
      </div>
    )
  }
}

export default News;