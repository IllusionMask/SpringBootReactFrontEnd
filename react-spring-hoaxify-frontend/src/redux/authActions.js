import LoginService from '../services/LoginService';
import UserService from '../services/UserService';

//Returning JSON
export const loginSuccess = (loginUserData) => {
  return {
    type: 'login-success',
    payload: loginUserData
  };
};


//No use
//Returning function
export const loginHandler = (credentials) => {
  return function(dispatch) {
    return LoginService.postLogin(credentials).then((response) => {
      dispatch(
        loginSuccess({
          ...response.data,
          password: credentials.password
        })
      );
      return response;
    });
  };
};


export const signupHandler = (user) => {
  return function(dispatch) {
    return UserService.signupNewUser(user).then((response) => {
      return dispatch(loginHandler(user));
    });
  };
};