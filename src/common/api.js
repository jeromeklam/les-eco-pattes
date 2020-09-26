import axios from 'axios';
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

export default instance;
