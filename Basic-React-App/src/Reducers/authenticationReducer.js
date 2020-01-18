import { userConstants } from '../Constants/userConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : { loggedIn: false, user };

export function authenticationReducer(state = initialState, action) {

  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };;
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}