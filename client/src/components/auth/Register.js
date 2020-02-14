import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

class Register extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: {},
    redirect: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    try {
      const res = await axios.post('/api/users/register', newUser);
      if (res.status === 200) {
        this.setState({redirect: true});
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/login' />;
    }
    const { username, email, password, confirmPassword } = this.state;
    return (
      <React.Fragment>
        <div className="login-container">
          <div className="form-header">
            <h1>Dev Challenge</h1>
          </div>
          <div className="form-container">
            <form className="register-form">
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
                  type="email" 
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Email"/>
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
              <div className="form-group">
              <input 
                  type="password" 
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Confirm password"/>
              </div>
            </form>
            <button className="register-btn" onClick={this.handleSubmit} />
          </div>
          <p>Already registered? 
            <Link className="link" to="/login"> Sign In</Link></p>
        </div>
      </React.Fragment>
    )
  }
}

export default Register;