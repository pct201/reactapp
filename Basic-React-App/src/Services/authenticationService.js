const axios = require('axios');

const login = (userName, password) => {
    return (
        axios.post("Auth/Login", { "userName": userName, "password": password }, {
            'Content-Type': 'application/json'
        }).then(user => {
            return user.data;
        },
            error => {
                return error;
                // dispatch(alertService.error("Somthing wrong!"));
            })
    )
}

const logout = () => {
    localStorage.removeItem('user');
}

const register = (user) => {
    return (
        axios.post("Auth/RegisterNewUser", user,
            {
                'Content-Type': 'application/json'
            }).then(users => {
                return users.data;
            })
    );
}


const createPassword = (userId, token, password) => {
    return (
        axios.post("Auth/CreatePassword", { "userId": userId, "token": token, "password": password }, {
            'Content-Type': 'application/json'
        }).then(result => {
            return result.data;
        })
    );
}

const forgotPassword = (email) => {
    return (
        axios.post("Auth/ForgotPassword/?emailId=" + email)
            .then(result => {
                return result.data;
            },
                error => {
                    return error;
                })
    );
}

export const authenticationService = {
    login,
    logout,
    register,
    createPassword,
    forgotPassword
};