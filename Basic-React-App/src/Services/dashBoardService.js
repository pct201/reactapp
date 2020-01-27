import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const dashBoardService = {
    dashboardDetail
};

function dashboardDetail() {
    return (
        axios.get(process.env.REACT_APP_Local_API_URL + "Home/DashboardDetail", { headers :authHeader()}).then(
            result => {               
                return result.data;
            },
            error => {                
                return null
            })
    )
}






