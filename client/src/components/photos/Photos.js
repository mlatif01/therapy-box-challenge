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
    imageData: '',
    uploadedFile: '',
    goBack: false
  }

  updatePhotos = () => {

  }

  getImageData = async (e) => {
    // get all the tasks for the current user
    const token = localStorage.getItem('token');
    const headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': `${token}`
      }
    }
    const res = await axios.get('/api/upload', headerConfig);
    if (res.data.image) {
      this.setState({
        imageData: res.data.image
      });
    }
  }

  async componentDidMount() {
    this.getImageData();
  }

  onSubmit = async (e) => {
    e.preventDefault();
    console.log(this.state);
    const formData = new FormData();
    formData.append('imageData', this.state.setFile);
    console.log(formData);
    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token')
        }
      });
      console.log(res.data);
      this.setState({
        uploadedFile: res.data.file
      })
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
    // The line below is from the gods
    let image = btoa(String.fromCharCode(...new Uint8Array(this.state.imageData.data)));
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
              <form>
                <input name="imageData" type="file" onChange={this.onChange}/>
                <img src={addButton} onClick={this.onSubmit} />
                <img className="photos-img"src={`data:image/jpeg;base64,${image}`} />
              </form>
            </div>
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