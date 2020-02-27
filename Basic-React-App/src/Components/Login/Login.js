import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { authenticationService, alertService } from '../../Services'
import { history } from '../../Helpers/history';

class Login extends Component {
  constructor(props) {
    super(props);

    // reset login status
    authenticationService.logout();

    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
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
      authenticationService.login(username, password).then(user => {
        switch (user.errorCode) {
          case 201:
            this.props.errorAlerts("You have not set password.Please check your email");
            break
          case 202:
            this.props.errorAlerts("Username or password is incorrect");
            break
          default:
            localStorage.setItem('user', JSON.stringify(user));
            this.setState({
              redirectToReferrer: true
            })
          // history.push('/dashboard');
        }
      }, error => {
        this.props.errorAlerts("Somthing wrong!")
      })
    }
    else {
      this.validator.showMessages();
    }
  }

  render() {

    const { from } = this.props.location.state || { from: { pathname: '/dashboard' } }
    const { redirectToReferrer } = this.state
    if (redirectToReferrer === true) {
      return <Redirect to={from} />
    }
    const { alert } = this.props;
    return (
      <div className="wrapper login-page">
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
                <button className="btn btn-primary w-100" value="Log in" onClick={this.handleSubmit} ><span>Log in</span></button>

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
  const { alert } = state;
  return { alert };
}
const actionCreators = {
  errorAlerts: alertService.error,
  clearAlerts: alertService.clear
}
export default connect(mapState, actionCreators)(Login);


