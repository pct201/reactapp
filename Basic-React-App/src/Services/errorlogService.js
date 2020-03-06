const axios = require('axios');

const getAllErrorLog = (page, perPage, sortDirection, sortBy) => {
    return (
        axios.get("ErrorLog/AllErrorDetails?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: { 'Content-Type': 'application/json' } })
            .then(result => {
                return result.data;
            })
    );
}

const exportToExcel = () => {
    return (
        axios.get("ErrorLog/ErrorLogExportToExcel", {
            'responseType': 'blob'
        })
            .then(response => {
                return response.data
            })
    );
}

export const errorlogService = {
    getAllErrorLog,
    exportToExcel
};