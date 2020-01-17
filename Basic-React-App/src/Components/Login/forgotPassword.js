import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import SimpleReactValidator from 'simple-react-validator';
import { authenticationService } from '../../Services'
import MessagePopup from '../Popup/MessagePopup';

export default class forgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",     
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
   
      if (this.validator.allValid()) {
        authenticationService.forgotPassword(this.state.email).then(result => {  
          debugger       
          if (result.success) //reset link sent successfully
          {
            this.setState({
              popupState: {
                isshow: true,
                title: "Success",
                message: "We have sent reset password link to your email."
              }
            })
          }         
          else { //error in mail sending 
            this.setState({
              popupState: {
                isshow: true,
                title: "Error",
                message: "Something went wrong. Please try again later."
              }
            })
          }
        })
      }
      else {
        this.validator.showMessages();
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
                <h2>Forgot Your Password?</h2>
                <p>Simply enter your email address below and we'll send you a link to reset your password right away.</p>
                <form>
                 
                    <div className="form-group">
                      <input type="text" className="form-control" id="email" ref="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} error_msg="Email" />
                      <span className="errorfont">{this.validator.message('email', this.state.email, 'required|email')}</span>
                    </div>
                 
                  <input type="button" className="btn btn-primary w-100" value="Send Password Reset Link" onClick={this.handleSubmit} />

                </form>
                <p className="sign-up p-0">
                  <Link to="/login">Back to login.</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <MessagePopup show={this.state.popupState.isshow} title={this.state.popupState.title} message={this.state.popupState.message} popupclose={() => this.handleModelHide()} />
        </div>
      </Fragment>
    );
  }
}



