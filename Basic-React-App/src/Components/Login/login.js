import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { authenticationService,alertService } from '../../Services'
import { history } from '../../Helpers/history';
import Loader from '../Common/Loader'

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: ''
    };

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
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
    if (this.validator.allValid()) {
      const { username, password } = this.state;
      this.props.login(username, password)
        }
    else {
      this.validator.showMessages();
    }
  }

  render() {    
    
    const { alert,authentication } = this.props;
    return (     
      <div className="wrapper login-page">
          <Loader show={authentication.loggedIn} />
        <div className="login-panel">
          <div className="login-block">
            <a className="login-logo" href="#/" title="ProCare"><img src={require('../../images/logo.png')} alt="" /></a>
            <div className="card">
              <span className="login-icon"><span><img src={require('../../images/login-icon.svg')} alt="" /></span></span>
              <h2>Welcome, Provider!</h2>
               {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
              }
              
              <form>
                <div className="form-group">
                  <input type="text" className="form-control" id="username" name="username" placeholder="User ID" value={this.state.username} onChange={this.handleChange} />
                  <span className="errorfont">{this.validator.message('username', this.state.username, `required`)}</span>
                </div>
                <div className="form-group">
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
                  <span className="errorfont">{this.validator.message('password', this.state.password, `required`)}</span>
                </div>
                <div className="form-group">
                  <div className="clearfix">
                    {/* <div className="custom-control custom-checkbox float-left">
                      <input type="checkbox" className="custom-control-input" id="customControlInline" />
                      <label className="custom-control-label" >Remember me</label>
                    </div> */}
                    <Link className="forgot float-left" to="/forgotPassword">Forgot password?</Link>
                  </div>
                </div>
                <input type="button" className="btn btn-primary w-100" value="Log in" onClick={this.handleSubmit} />

              </form>
              <p className="sign-up p-0">
                Don’t have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

function mapState(state) {
 
  const { authentication,alert } = state;
 
  return {authentication,alert}; 
}
const actionCreators = {
  login: authenticationService.login,
  logout: authenticationService.logout,
  clearAlerts: alertService.clear
}

export default connect(mapState, actionCreators)(Login);


