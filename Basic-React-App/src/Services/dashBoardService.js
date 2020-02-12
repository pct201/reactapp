const axios = require('axios');

export const dashBoardService = {
    dashboardDetail
};

function dashboardDetail() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Home/DashboardDetail").then(
            result => {
                return result.data;
            })
    )
}





