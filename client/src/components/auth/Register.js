import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import "./style.css";

class Register extends Component {

  state = {
    username: '',
    usernameError: '',
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    confirmPassword: '',
    confirmPasswordError: '',
    errors: {},
    redirect: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  validate = () => {
    // -- Basic validation --
    let isError = false;
    const errors = {
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
    };

    // validate fields
    if (this.state.username.length < 6 || this.state.username.length > 31) {
      isError = true;
      errors.usernameError = 'Username must be between 6 - 30 characters'
    }

    if (this.state.email.indexOf('@') === -1) {
      isError = true;
      errors.emailError = 'Requires a valid email '
    }

    if (this.state.password.length < 6 || this.state.password.length > 31) {
      isError = true;
      errors.password = 'Requires a valid password '
    }

    if (this.state.password !== this.state.confirmPassword) {
      isError = true;
      errors.confirmPasswordError = 'Passwords do not match';
    }

    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const err = this.validate();
    if (!err) {
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
                  <small>{this.state.usernameError}</small>
              </div>
              <div className="form-group">
              <input 
                  type="email" 
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Email"/>
                  <small>{this.state.emailError}</small>
              </div>
              <div className="form-group">
              <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Password"/>
                  <small>{this.state.passwordError}</small>
              </div>
              <div className="form-group">
              <input 
                  type="password" 
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={this.handleChange}
                  className="form-control" 
                  placeholder="Confirm password"/>
                  <small>{this.state.confirmPasswordError}</small>
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