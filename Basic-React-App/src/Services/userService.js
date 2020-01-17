import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const userService = {   
    getAllUser,
    getUserById,
    updateUserDetail,
    deleteUser,
    educationList
};

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
