import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');


export const userService = {
    login,
    logout,
    // register,
    // getAll,
    // getById,
    // update,
    delete: _delete
};

function login(userName, password) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "Auth/Login", { "userName": userName, "password": password }, {
            'Content-Type': 'application/json'
        }).then(result => {
            debugger;
            localStorage.setItem('user', JSON.stringify(result.data));
            return result.data;
        })
    )
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

// function register(user) {
//     axios.post(process.env.REACT_APP_API_URL + "Employee/InsertEmployeeDetails", user,
//         {
//             ...authHeader(), 'Content-Type': 'application/json'
//         }).then(result => {
//             return result.data;
//         })
// }

// function getAllUser() {
//     axios.get(process.env.REACT_APP_API_URL + "Employee/AllEmployeeDetails", { headers: authHeader() })
//         .then(result => {
//             return result.data;
//         })
// }

// function getUserById(id) {
//     axios.get(process.env.REACT_APP_API_URL + "Employee/GetEmployeeDetailsById/" + id, authHeader())
//         .then(result => {
//             return result.data;
//         })
// }


// function update(user) {
//     axios.post(process.env.REACT_APP_API_URL + "Employee/InsertEmployeeDetails", user,
//     {
//         ...authHeader(), 'Content-Type': 'application/json'
//     }).then(result => {
//         return result.data;
//     })
// }

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    // const requestOptions = {
    //     method: 'DELETE',
    //     headers: authHeader()
    // };

    // return fetch(`/users/${id}`, requestOptions).then(handleResponse);
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 window.location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }