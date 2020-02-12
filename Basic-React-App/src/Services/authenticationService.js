
const axios = require('axios');

export const authenticationService = {
    login,
    logout,
    register,
    createPassword,
    forgotPassword
};

function login(userName, password) {    
    return (       
        axios.post(process.env.REACT_APP_API_URL + "Auth/Login", { "userName": userName, "password": password }, {
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

function logout() {
    localStorage.removeItem('user');  
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
        axios.post(process.env.REACT_APP_API_URL + "Auth/CreatePassword", { "userId": userId, "token": token, "password": password }, {
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
