import { userConstants } from '../Constants/userConstants';
import { history } from '../Helpers/history';
import { alertService } from './alertService'
const axios = require('axios');

export const authenticationService = {
    login,
    logout,
    register,
    createPassword,
    forgotPassword
};

const request = user => { return { type: userConstants.LOGIN_REQUEST, user } }
const success = user => { return { type: userConstants.LOGIN_SUCCESS, user } }
const failure = () => { return { type: userConstants.LOGIN_FAILURE } }

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));

        axios.post(process.env.REACT_APP_API_URL + "Auth/Login", { "userName": userName, "password": password }, {
            'Content-Type': 'application/json'
        }).then(user => {
            switch (user.data.errorCode) {
                case 201:
                    dispatch(failure());
                    dispatch(alertService.error("You have not set password.Please check your email"));

                    break
                case 202:
                    dispatch(failure());
                    dispatch(alertService.error("Username or password is incorrect"));
                    break
                default:
                    localStorage.setItem('user', JSON.stringify(user.data));
                    dispatch(success(user.data));
                    history.push('/');
            }

        },
            error => {
                dispatch(failure());
                dispatch(alertService.error("Somthing wrong!"));
            })
    };
}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

function register(user) {

    return (
        axios.post(process.env.REACT_APP_API_URL + "Auth/RegisterNewUser", user,
            {
                'Content-Type': 'application/json'
            }).then(users => {
                return users.data;
            })
    );
}


function createPassword(userId, token, password) {

    return (
        axios.post(process.env.REACT_APP_Local_API_URL + "Auth/CreatePassword", { "userId": userId, "token": token, "password": password }, {
            'Content-Type': 'application/json'
        }).then(result => {
            return result.data;
        })
    );
}

function forgotPassword(email) {

    return (
        axios.post(process.env.REACT_APP_API_URL + "Auth/ForgotPassword/?emailId=" + email)
            .then(result => {
                return result.data;
            },
                error => {
                    return error;
                })
    );
}