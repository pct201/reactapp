import { userConstants } from '../Constants/userConstants';
import { userService } from '../Services/userService';
import{history} from '../Helpers/history'

export const userActions = {
    login,
    logout   
};

const request=()=> {return { type: userConstants.LOGIN_REQUEST } }
const success=user=> {return { type: userConstants.LOGIN_SUCCESS,  user } }
const failure=error=> {return { type: userConstants.LOGIN_FAILURE, error } }

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        userService.login(username, password)
            .then(
                user => {                    
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));                  
                }
            );
    };
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}