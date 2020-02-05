import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const permissionService = {
    getAllPermissionList,
    getPermissionDetailById,
    updatePermissionDetail  
};

function getAllPermissionList(page, perPage, sortDirection, sortBy) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Permission/AllPermissionList?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: authHeader(), 'Content-Type': 'application/json' })
            .then(result => {
                return result.data;
            },
                error => {
                    handleError(error)
                })
    );
}

function getPermissionDetailById(permissionUid) {
        return (
        axios.get(process.env.REACT_APP_API_URL + "Permission/GetPermissionDetailById?permissionUid=" + permissionUid, { headers: authHeader() })
            .then(result => {               
                return result.data;
            },
                error => {
                    handleError(error, null)
                })
    )
}

function updatePermissionDetail(pemissionDetail,roleList) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "Permission/UpdatePermissionDetail", { "pemissionDetail": pemissionDetail, "roleList": roleList },
            { headers: { ...authHeader(), 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            },
                error => {
                    handleError(error, false)
                })
    )
}

function handleError(error, response = '') {  
    if (error.response !== undefined && error.response.status === 401)
        window.location.href = "/login";
    else
        return (response !== '') ? response : error
}