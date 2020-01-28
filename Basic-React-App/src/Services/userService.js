import { authHeader } from '../Helpers/authHeader';
import { history } from '../Helpers/history';
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
        axios.get(process.env.REACT_APP_API_URL + "User/AllUserDetails?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: authHeader(), 'Content-Type': 'application/json' })
            .then(users => {
                return users.data;
            },
                error => {
                    if(error.response.status===401)
                         history.push('/login',null)
                    else return error;
                })
    );
}

function getUserById(id) {

    return (
        axios.get(process.env.REACT_APP_API_URL + "User/GetUserDetailsById?id=" + id, { headers: authHeader() })
            .then(user => {
                return user.data;
            },
                error => {
                    if(error.response.status===401)
                         history.push('/login',null)
                    else return error;
                })
    )
}

function updateUserDetail(user) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "User/UpdateUserDetails", user,
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
        axios.delete(process.env.REACT_APP_API_URL + "User/DeleteUsers?ids=" + userIds, { headers: authHeader() }).then(user => {
            return user.data;
        },
            error => {
                return false;
            })
    );
}

function educationList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "User/GetEducationList").then(
            result => {
                return result.data;
            },
            error => {
                return error
            })
    )
}
