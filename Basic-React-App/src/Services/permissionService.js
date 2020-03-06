const axios = require('axios');

const getAllPermissionList = (page, perPage, sortDirection, sortBy) => {
    return (
        axios.get("Permission/AllPermissionList?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: { 'Content-Type': 'application/json' } })
            .then(result => {
                return result.data;
            })
    );
}

const getPermissionDetailById = (permissionUid) => {
    return (
        axios.get("Permission/GetPermissionDetailById?permissionUid=" + permissionUid)
            .then(result => {
                return result.data;
            })
    )
}

const updatePermissionDetail = (pemissionDetail, roleList) => {
    return (
        axios.post("Permission/UpdatePermissionDetail", { "pemissionDetail": pemissionDetail, "roleList": roleList },
            { headers: { 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            })
    )
}

export const permissionService = {
    getAllPermissionList,
    getPermissionDetailById,
    updatePermissionDetail
};
