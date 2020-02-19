import React, { Component } from 'react'
import "./style.css";
import axios from 'axios';
import addButton from './assets/Plus_button.png';
import BackButton from '../utils/BackButton';
import auth from '../auth/auth';
import { Redirect } from 'react-router-dom';

class Photos extends Component {

  state = {
    setFile: '',
    setFilename: '',
    fileName: '',
    filePath: '',
    goBack: false
  }

  updatePhotos = () => {

  }

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const formData = new FormData();
    formData.append('file', this.state.setFile);
    try {
      const res = await axios.post('/api/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token')
        }
      });
      const {fileName, filePath} = res.data;
      this.state.fileName = fileName;
      this.state.filePath = filePath;
      this.updatePhotos();
      console.log(res.data);
    } catch (err) {
      if (err.response.status === 500) {
        console.log('There was a problem with the server');
      } else {
        console.log(err.response.data.msg);
      }
    }
  }

  setGoBack = (e) => {
    this.setState({
      goBack: true
    })
  }

  onChange = (e) => {
    this.setState({
      setFile: e.target.files[0],
      setFilename: e.target.files[0].name
    });
  }

  render() {
    if (this.state.goBack) {
      return <Redirect to='/dashboard' />;
    }
    if (auth.isAuthenticated()) {
      return (
        <div className="photos-item">
          <div className="photos-header">
            <h1>Photos</h1>
            <BackButton triggerParentUpdate={this.setGoBack}/>
          </div>

          <div className="photos-content">
            <div className="photos-pic">
              <input type="file" onChange={this.onChange}/>
              <img src={addButton} onClick={this.onSubmit} />
            </div>
            {
              this.state.uploadedFile ?
              <div className="uploaded-img">
                <h3>{this.state.fileName}</h3>
                <img style={{width: '100%'}}src={this.state.filePath} />
              </div>
              :
              null
            }
          </div>
        </div>
      )
    } else {
      return <Redirect to={
        {
          pathname: '/',
          state: {
            from: this.props.location
          }
        }
      } />
    }
  }
}

export default Photos;