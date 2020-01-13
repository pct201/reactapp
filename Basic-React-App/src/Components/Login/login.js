import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userActions } from '../../Actions/userActions'

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    if (username && password) {     
       this.props.login(username, password);
    }
  }

  render() {
    return (
      <div className="wrapper login-page">
        <div className="login-panel">
          <div className="login-block">
            <a className="login-logo" href="#/" title="ProCare"><img src={require('../../images/logo.png')} alt="" /></a>
            <div className="card">
              <span className="login-icon"><span><img src={require('../../images/login-icon.svg')} alt="" /></span></span>
              <h2>Welcome, Provider!</h2>
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" id="username" name="username" placeholder="User ID" value={this.state.username} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                </div>
                <div className="form-group">
                  <div className="clearfix">
                    <div className="custom-control custom-checkbox float-left">
                      <input type="checkbox" className="custom-control-input" id="customControlInline" />
                      <label className="custom-control-label" >Remember me</label>
                    </div>
                    <a className="forgot float-right" href="#/" title="Forgot password?">Forgot password?</a>
                  </div>
                </div>
                <a onClick={this.handleSubmit} className="btn btn-primary w-100">
                  <span>Log in</span>
                </a>

              </form>
              <p className="sign-up p-0">
                Don’t have an account? <a href="#" title="Sign up"> Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
}

export default connect(null, actionCreators)(Login);


