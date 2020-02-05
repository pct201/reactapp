import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const dashBoardService = {
    dashboardDetail
};

function dashboardDetail() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Home/DashboardDetail", { headers: authHeader() }).then(
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






