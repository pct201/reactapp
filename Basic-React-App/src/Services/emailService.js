const axios = require('axios');

//------------------------------ Email Template Service Region Start -----------------------------//
const getAllEmailTemplate = (page, perPage, sortDirection, sortBy) => {
    return (
        axios.get("Email/AllEmailTemplate?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy, { headers: { 'Content-Type': 'application/json' } })
            .then(result => {
                return result.data;
            })
    );
}

const getEmailTemplateById = (emailUid) => {
    return (
        axios.get("Email/GetEmailTemplateById?emailUid=" + emailUid)
            .then(result => {
                return result.data;
            })
    )
}

const updateEmailTemplate = (emailTemplate) => {
    return (
        axios.post("Email/UpdateEmailTemplateDetail", emailTemplate,
            { headers: { 'Content-Type': 'application/json' } }).then(result => {
                return result.data;
            })
    )
}

const getPlaceholderList = () => {
    return (
        axios.get("Email/AllPlaceHolderList").then(
            result => {
                return result.data;
            })
    )
}
//------------------------------ Email Template Service Region END -----------------------------//

//------------------------------ Email Log Service Region Start -----------------------------//
const getAllEmailLog = (page, perPage, sortDirection, sortBy, date, emailTitle) => {
    let filterDate = (date !== "") ? date.toISOString() : "";
    return (
        axios.get("Email/AllEmailLog?page=" + page + "&perPage=" + perPage + "&sortDirection=" + sortDirection + "&sortBy=" + sortBy + "&date=" + filterDate + "&emailTitle=" + emailTitle, { headers: { 'Content-Type': 'application/json' } })
            .then(result => {
                return result.data;
            })
    );
}

const resendEmail = (emailId) => {
    return (
        axios.post("Email/ResendMail?emailId=" + emailId, null, { headers: { 'Content-Type': 'application/json' } }).then(result => {
            return result.data;
        })
    );
}
//------------------------------ Email Log Service Region END -----------------------------//
export const emailService = {
    getAllEmailTemplate,
    getEmailTemplateById,
    updateEmailTemplate,
    getPlaceholderList,
    getAllEmailLog,
    resendEmail
};



