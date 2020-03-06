import { alertConstants } from '../Constants/alertConstants';

const success = (message) => {
    return { type: alertConstants.SUCCESS, message };
}

const error = (message) => {
    return { type: alertConstants.ERROR, message };
}

const clear = () => {
    return { type: alertConstants.CLEAR };
}

export const alertService = {
    success,
    error,
    clear
};
