import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const userService = {
    getAllUser,
    getUserById,
    updateUserDetail,
    deleteUser,
    educationList,
    userRoleList,
    updatePassword
};

function getAllUser(page, perPage, sortDirection, sortBy) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "User/AllUserDetails?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: authHeader(), 'Content-Type': 'application/json' })
            .then(users => {
                return users.data;
            },
                error => {
                    handleError(error)
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
                    handleError(error)
                })
    )
}

function updateUserDetail(user) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "User/UpdateUserDetails", user,
            { headers: { ...authHeader(), 'Content-Type': 'application/json' } }).then(users => {
                return users.data;
            },
                error => {
                    handleError(error)
                })
    )
}

function updatePassword(userId,oldPassword,newPassword) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "User/UpdatePassword", { "userId": userId, "oldPassword": oldPassword ,"newPassword": newPassword},
            { headers: { ...authHeader(), 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            },
                error => {
                    handleError(error)
                })
    )
}

function deleteUser(userIds) {
    return (
        axios.delete(process.env.REACT_APP_API_URL + "User/DeleteUsers?ids=" + userIds, { headers: authHeader() }).then(user => {
            return user.data;
        },
            error => {
                handleError(error)
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
                handleError(error)
            })
    )
}

function userRoleList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "User/GetUserRoleList").then(
            result => {
                return result.data;
            },
            error => {
                handleError(error)
            })
    )
}

function handleError(error) {    
    if (error.response !== undefined &&error.response.status === 401)
        window.location.href = "/login";
    else
        return error
}