const axios = require('axios');

export const dashBoardService = {
    dashboardDetail
};

function dashboardDetail() {
    return (
        axios.get("Home/DashboardDetail").then(
            result => {
                return result.data;
            })
    )
}





