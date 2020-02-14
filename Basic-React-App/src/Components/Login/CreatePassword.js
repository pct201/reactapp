import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { authenticationService } from '../../Services'
import queryString from 'query-string';
import {HelpTip} from '../Common';
import {MessagePopup} from '../Popup';


export default class CreatePassword extends Component {
  constructor(props) {
    super(props);

    let params = queryString.parse(this.props.location.search)
    this.state = {
      username: params.uid,
      password: "",
      confirm_password: "",
      token: params.token,     
      popupState: {
        message: "",
        title: "",
        isshow: false
      }
    };
    this.validator = new SimpleReactValidator({ autoForceUpdate: this });
    this.handleChange = this.handleChange.bind(this);
    this.handleModelHide = this.handleModelHide.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value
    });
  }

  handleModelHide() {
    this.props.history.push('/login', null)
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.username === '' || this.state.username === undefined) {
      this.setState({
        popupState: {
          isshow: true,
          title: "Error",
          message: "Token Or EmailId is invalid please provide currect information Or Contact Admin."
        }
      })
    }
    else {
      if (this.validator.allValid()) {      
        authenticationService.createPassword(this.state.username, this.state.token, this.state.password).then(result => {        
          switch (result.errorCode) {
            case 201:
              this.setState({
                popupState: {
                  isshow: true,
                  title: "Error",
                  message: "Password should be deffrent then old password."
                }
              })
              break
            case 202:
              this.setState({
                popupState: {
                  isshow: true,
                  title: "Error",
                  message: "Your Account is not active please contact to admin."
                }
              })
              break
            case 203:
              this.setState({
                popupState: {
                  isshow: true,
                  title: "Error",
                  message: "Token Or EmailId is invalid please provide currect information or contact to admin."
                }
              })
              break
            case 204:
              this.setState({
                popupState: {
                  isshow: true,
                  title: "Error",
                  message: "Email Link has been expired so We have sent new link on registerd email. Please check your email"
                }
              })
              break
            default:
              this.setState({
                popupState: {
                  isshow: true,
                  title: "Success",
                  message: "Your Password set Successfully."
                }
              })
          }
        })
      }
      else {
        this.validator.showMessages();
      }
    }
  }

  render() {
    return (
      <Fragment>       
        <div className="wrapper login-page">        
          <div className="login-panel">
            <div className="login-block">
              <a className="login-logo" href="#/" title="ProCare"><img src={require('../../images/logo.png')} alt="" /></a>
              <div className="card">
                <span className="login-icon"><span><img src={require('../../images/login-icon.svg')} alt="" /></span></span>
                <h2>Set Password</h2>
                <form>
                  <div className="form-group tooltipContainer">
                    <input type="password" className="form-control" id="password" name="password" placeholder="New Password" value={this.state.password} onChange={this.handleChange} />
                    <HelpTip message={"Password must have 6 to 16 length including at least one number and one special character."}/>
                    <span className="errorfont">{this.validator.message('password', this.state.password, ['required', { regex: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ }], { messages: { regex: 'Password must have 6 to 16 length including at least one number and one special character.' } })}</span>
                  </div>
                  <div className="form-group">
                    <input type="password" className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" value={this.state.confirm_password} onChange={this.handleChange} />
                    <span className="errorfont">
                      {this.validator.message('confirm_password', this.state.confirm_password, `required|in:${this.state.password}`, { messages: { in: 'Passwords need to match!' } })}
                    </span>
                  </div>
                  <button className="btn btn-primary w-100" value="Set Password" onClick={this.handleSubmit} ><span>Set Password</span></button>
                </form>
                <p className="sign-up p-0">
                  Any issue then go <Link to="/login">Back to login.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <MessagePopup show={this.state.popupState.isshow} title={this.state.popupState.title} message={this.state.popupState.message} popupClose={() => this.handleModelHide()} />
        </div>
      </Fragment>
    );
  }
}



