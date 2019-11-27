import axios  from 'axios';
import cookie from 'react-cookies';

export function initAxios(token) {
  console.log(token);
  axios.defaults.headers.common['Api-Id']        = process.env.REACT_APP_API_ID;
  axios.defaults.headers.common['Content-Type'] = 'application/vnd.api+json';
  axios.defaults.headers.common['Accept']       = 'application/vnd.api+json';
  axios.defaults.timeout                        = 40000;
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    if (cookie.load('Authorization')) {
      axios.defaults.headers.common['Authorization'] = cookie.load('Authorization');
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }
  if (cookie.load('SSO_ID')) {
    axios.defaults.headers.common['Sso-Id'] = cookie.load('SSO_ID');
  } else {
    delete axios.defaults.headers.common['Sso-Id'];
  }
  if (cookie.load('APP_ID')) {
    axios.defaults.headers.common['App-Id'] = cookie.load('APP_ID');
  } else {
    delete axios.defaults.headers.common['App-Id'];
  }
}
