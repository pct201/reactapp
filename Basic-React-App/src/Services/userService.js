
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
        axios.get(process.env.REACT_APP_API_URL + "User/AllUserDetails?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: {'Content-Type': 'application/json'} })
            .then(users => {
                return users.data;
            })
    );
}

function getUserById(id) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "User/GetUserDetailsById?id=" + id)
            .then(user => {
                return user.data;
            })
    )
}

function updateUserDetail(user) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "User/UpdateUserDetails", user,
            { headers: {'Content-Type': 'application/json' } }).then(users => {
                return users.data;
            })
    )
}

function updatePassword(userId,oldPassword,newPassword) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "User/UpdatePassword", { "userId": userId, "oldPassword": oldPassword ,"newPassword": newPassword},
            { headers: { 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            })
    )
}

function deleteUser(userIds) {
    return (
        axios.delete(process.env.REACT_APP_API_URL + "User/DeleteUsers?ids=" + userIds).then(user => {
            return user.data;
        })
    );
}

function educationList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "User/GetEducationList").then(
            result => {
                return result.data;
            })
    )
}

function userRoleList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "User/GetUserRoleList").then(
            result => {
                return result.data;
            })
    )
}