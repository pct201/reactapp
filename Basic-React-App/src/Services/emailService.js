import { authHeader } from '../Helpers/authHeader';
const axios = require('axios');

export const emailService = {
    getAllEmailTemplate,
    getEmailTemplateById,
    updateEmailTemplate,
    getPlaceholderList   
};

function getAllEmailTemplate(page, perPage, sortDirection, sortBy) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/AllEmailTemplate?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: authHeader(), 'Content-Type': 'application/json' })
            .then(result => {
                return result.data;
            },
                error => {
                    return error;
                })
    );
}

function getEmailTemplateById(emailUid) {

    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/GetEmailTemplateById?emailUid=" + emailUid, { headers: authHeader() })
            .then(result => {
                return result.data;
            },
                error => {
                    return error;
                })
    )
}

function updateEmailTemplate(emailTemplate) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "Email/UpdateEmailTemplateDetail", emailTemplate,
            { headers :{...authHeader(), 'Content-Type': 'application/json'}}).then(result => {    
              return result.data;
            },
                error => {
                    return false;
                })
    )
}


function getPlaceholderList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/AllPlaceHolderList", { headers :authHeader()}).then(
            result => {               
                return result.data;
            },
            error => {                
                return null
            })
    )
}






