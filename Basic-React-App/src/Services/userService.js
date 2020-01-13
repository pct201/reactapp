import { authHeader } from '../Helpers/authHeader';
import { userConstants } from '../Constants/userConstants';
import { history } from '../Helpers/history'
const axios = require('axios');

export const userService = {
    login,
    logout,
    register,
    getAllUser,
    getUserById,
    updateUserDetail,
    deleteUser,
    educationList
};

const request = () => { return { type: userConstants.LOGIN_REQUEST } }
const success = user => { return { type: userConstants.LOGIN_SUCCESS, user } }
const failure = error => { return { type: userConstants.LOGIN_FAILURE, error } }

function login(userName, password) {
    return dispatch => {
        dispatch(request({ userName }));
        debugger;
        axios.post(process.env.REACT_APP_API_URL + "Auth/Login", { "userName": userName, "password": password }, {
            'Content-Type': 'application/json'
        }).then(user => {
            debugger;
            localStorage.setItem('user', JSON.stringify(user.data));
            dispatch(success(user.data));
            history.push('/');
        },
            error => {
                dispatch(failure(error));
            })
    };
}

function logout() {
    localStorage.removeItem('user');
    return { type: userConstants.LOGOUT };
}

function register(user) {

    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL + "Employee/RegisterNewUser", user,
            {
                'Content-Type': 'application/json'
            }).then(user => {
                history.push('/login');
            })
    };
}

function getAllUser() {
    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL + "Employee/AllEmployeeDetails", { headers: authHeader() })
            .then(users => {
                return users.data;
            },
                error => {
                    return error;
                })
    };
}

function getUserById(id) {

    return dispatch => {
        axios.get(process.env.REACT_APP_API_URL + "Employee/GetEmployeeDetailsById" + id, authHeader())
            .then(user => {
                return user.data;
            },
                error => {
                    return error;
                })
    };
}

function updateUserDetail(user) {

    return dispatch => {
        axios.post(process.env.REACT_APP_API_URL + "Employee/UpdateEmployeeDetails", user,
            {
                ...authHeader(), 'Content-Type': 'application/json'
            }).then(users => {
                return user.data;
            },
                error => {
                    return error;
                })
    };
}

function deleteUser(userIds) {

    return dispatch => {
        axios.delete(process.env.REACT_APP_API_URL + "Employee/DeleteEmployee?ids=" + JSON.stringify(userIds), authHeader()).then(user => {
            return user.data;
        },
            error => {
                return error;
            })
    };
}

function educationList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Employee/GetEducationList").then(
            result => {
                return result.data;
            },
            error => {
                return error
            })
    )
}
