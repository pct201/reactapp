
const axios = require('axios');

const getAllUser = (page, perPage, sortDirection, sortBy) => {
    return (
        axios.get("User/AllUserDetails?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: { 'Content-Type': 'application/json' } })
            .then(users => {
                return users.data;
            })
    );
}

const getUserById = (id) => {
    return (
        axios.get("User/GetUserDetailsById?id=" + id)
            .then(user => {
                return user.data;
            })
    )
}

const updateUserDetail = async (user) => {
    return (
        await axios.post("User/UpdateUserDetails", user,
            { headers: { 'Content-Type': 'application/json' } }).then(users => {
                return users.data;
            })
    )
}

const updatePassword = (userId, oldPassword, newPassword) => {
    return (
        axios.post("User/UpdatePassword", { "userId": userId, "oldPassword": oldPassword, "newPassword": newPassword },
            { headers: { 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            })
    )
}

const deleteUser = (userIds) => {
    return (
        axios.delete("User/DeleteUsers?ids=" + userIds).then(user => {
            return user.data;
        })
    );
}

const educationList = () => {
    return (
        axios.get("User/GetEducationList").then(
            result => {
                return result.data;
            })
    )
}

const userRoleList = () => {
    return (
        axios.get("User/GetUserRoleList").then(
            result => {
                return result.data;
            })
    )
}

export const userService = {
    getAllUser,
    getUserById,
    updateUserDetail,
    deleteUser,
    educationList,
    userRoleList,
    updatePassword
};