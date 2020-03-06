const axios = require('axios');

const dashboardDetail = () => {
    return (
        axios.get("Home/DashboardDetail").then(
            result => {
                return result.data;
            })
    )
}

export const dashBoardService = {
    dashboardDetail
};




