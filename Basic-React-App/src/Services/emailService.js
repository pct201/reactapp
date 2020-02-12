const axios = require('axios');
export const emailService = {
    getAllEmailTemplate,
    getEmailTemplateById,
    updateEmailTemplate,
    getPlaceholderList,
    getAllEmailLog,
    resendEmail
};

//------------------------------ Email Template Service Region Start -----------------------------//
function getAllEmailTemplate(page, perPage, sortDirection, sortBy) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/AllEmailTemplate?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: {'Content-Type': 'application/json'} })
            .then(result => {
                return result.data;
            })
    );
}

function getEmailTemplateById(emailUid) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/GetEmailTemplateById?emailUid=" + emailUid)
            .then(result => {
                return result.data;
            })
    )
}

function updateEmailTemplate(emailTemplate) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "Email/UpdateEmailTemplateDetail", emailTemplate,
            { headers: { 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            })
    )
}

function getPlaceholderList() {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/AllPlaceHolderList").then(
            result => {
                return result.data;
            })
    )
}
//------------------------------ Email Template Service Region END -----------------------------//

//------------------------------ Email Log Service Region Start -----------------------------//
function getAllEmailLog(page, perPage, sortDirection, sortBy, date, emailTitle) {
    return (
        axios.get(process.env.REACT_APP_API_URL + "Email/AllEmailLog?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy + "&date=" + date + "&emailTitle=" + emailTitle, { headers: {'Content-Type': 'application/json'} })
            .then(result => {
                return result.data;
            })
    );
}

function resendEmail(emailId) {
    return (
        axios.post(process.env.REACT_APP_API_URL + "Email/ResendMail?emailId=" + emailId, null, { headers: { 'Content-Type': 'application/json' } }).then(result => {
            return result.data;
        })
    );
}
//------------------------------ Email Log Service Region END -----------------------------//



