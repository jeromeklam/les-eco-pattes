import axios from 'axios';
import { store } from '../index.js';
import cookie from 'react-cookies';

let instance = axios.create({
  baseURL: process.env.REACT_APP_BO_URL,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    Accept: 'application/vnd.api+json',
  },
});

instance.interceptors.request.use(function(config) {
  config.headers.common['Api-Id'] = process.env.REACT_APP_API_ID;
  config.timeout = 40000;
  if (cookie.load('Authorization')) {
    config.headers.common['Authorization'] = cookie.load('Authorization');
  } else {
    config.headers.common['Authorization'] = 'JWT';
  }
  if (cookie.load('SSO_ID')) {
    config.headers.common['Sso-Id'] = cookie.load('SSO_ID');
  } else {
    delete config.headers.common['Sso-Id'];
  }
  if (cookie.load('APP_ID')) {
    config.headers.common['App-Id'] = cookie.load('APP_ID');
  } else {
    delete config.headers.common['App-Id'];
  }
  return config;
});

instance.interceptors.response.use(
  function(response) {
    let status = 200;
    if (response && response.status) {
      status = response.status;
    }
    if (status === 401 || status === '401') {
      cookie.remove('Authorization', { path: '/' });
      cookie.remove('AutoLogin', { path: '/' });
      const auth = (store && store.getState().auth.authenticated) || false;
      if (auth) {
        window.location.replace("/auth/signin");
      }
    }
    return response;
  },
  function(error) {
    if (!error.response || 401 === error.response.status) {
      cookie.remove('Authorization', { path: '/' });
      cookie.remove('AutoLogin', { path: '/' });
      const auth = (store && store.getState().auth.authenticated) || false;
      console.log(auth, store.getState().auth);
      if (auth) {
        window.location.replace("/auth/signin");
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
