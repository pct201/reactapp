import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const userService = {
    getAllUser,
    getUserById,
    updateUserDetail,
    deleteUser,
    educationList
};

function getAllUser(page, perPage, sortDirection, sortBy) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Employee/AllEmployeeDetails?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: authHeader(), 'Content-Type': 'application/json' })
            .then(users => {
                return users.data;
            },
                error => {
                    return error;
                })
    );
}

function getUserById(id) {

    return (
        axios.get(process.env.REACT_APP_API_URL + "Employee/GetEmployeeDetailsById/" + id, { headers: authHeader() })
            .then(user => {
                return user.data;
            },
                error => {
                    return error;
                })
    )
}

function updateUserDetail(user) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "Employee/UpdateEmployeeDetails", user,
            { headers :{...authHeader(), 'Content-Type': 'application/json'}}).then(users => {              
                return users.data;
            },
                error => {
                    return false;
                })
    )
}

function deleteUser(userIds) {
    return (
        axios.delete(process.env.REACT_APP_API_URL + "Employee/DeleteEmployee?ids=" + userIds, { headers: authHeader() }).then(user => {
            return user.data;
        },
            error => {
                return false;
            })
    );
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
