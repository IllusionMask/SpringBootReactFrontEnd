
import { createStore, applyMiddleware } from 'redux';
import authReducer from './authReducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import LoginService from '../services/LoginService';


const configureStore = () => {

  let localStorageData = localStorage.getItem('hoax-auth');

  let persistedState = {
    //I will not give default state
    // id: 0,
    // username: '',
    // displayName: '',
    // image: '',
    // password: '',
    // isLoggedIn: false
  };

  if (localStorageData) {
    try {
      persistedState = JSON.parse(localStorageData);
      LoginService.setAuthorizationHeader(persistedState);
    } catch (error) {
      //else localStorageData is null
    }
  }

  const store = createStore(authReducer, persistedState, applyMiddleware(thunk, logger));

    store.subscribe(() => {
    //To keep data
    localStorage.setItem('hoax-auth', JSON.stringify(store.getState()));
    //store's state contain username and password and isLoggedIn
    LoginService.setAuthorizationHeader(store.getState());
  });

  return store;

  //For testing purposes
  // // const middleware = addLogger
  // //   ? applyMiddleware(thunk, logger)
  // //   : applyMiddleware(thunk);
  //  const store = createStore(authReducer, persistedState, middleware);

  // return store;
};

export default configureStore;