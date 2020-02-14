import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import "./style.css";

class Login extends Component {

  state = {
    username: "",
    password: "",
    redirect: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    try {
      const res = await axios.post('/api/users/login', user);
      if (res.status === 200) {
        // store jwt token in local storage (Should implement better solution)
        localStorage.setItem('token', res.data.token);
        this.setState({redirect: true});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  
  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/dashboard' />;
    }
    const { username, password } = this.state;
    return (
      <React.Fragment>
        <div className="register-container">
          <div className="form-header">
            <h1>Dev Challenge</h1>
          </div>
          <div className="form-container">
            <form className="login-form">
              <div className="form-group">
                <input 
                  type="text" 
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Username"/>
              </div>
              <div className="form-group">
              <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Password"/>
              </div>
            </form>
            <button className="login-btn" onClick={this.handleSubmit} />
          </div>
          <p>New to the challenge? 
            <Link className="link" to="/register"> Sign Up</Link></p>
        </div>
      </React.Fragment>
    )
  }
}


export default Login;