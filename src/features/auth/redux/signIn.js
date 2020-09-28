import { freeAssoApi } from '../../../common';
import { jsonApiNormalizer, normalizedObjectModeler  } from 'jsonapi-front';
import {
  AUTH_SIGN_IN_BEGIN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_IN_DISMISS_ERROR,
} from './constants';
import cookie from 'react-cookies';
import { schema, defaultConfig } from '../';
import { saveToLS } from '../../ui';
import Ajv from 'ajv';

export function signIn(args = {}) {
  return dispatch => {
    dispatch({
      type: AUTH_SIGN_IN_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.post('/v1/sso/signin', args);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_SIGN_IN_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: AUTH_SIGN_IN_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissSignInError() {
  return {
    type: AUTH_SIGN_IN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_IN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signInPending: true,
        signInError: null,
      };

    case AUTH_SIGN_IN_SUCCESS:
      // The request is success
      const datas = action.data;
      let user = false;
      let token = false;
      let authenticated = false;
      let more = {};
      if (datas && datas.headers && datas.headers.authorization) {
        token = datas.headers.authorization;
      }
      let autologin = false;
      if (datas && datas.headers && datas.headers.autologin) {
        autologin = datas.headers.autologin;
      }
      if (datas.data) {
        let object = jsonApiNormalizer(datas.data);
        user = normalizedObjectModeler(object, 'FreeSSO_User', object.SORTEDELEMS[0], {eager: true});
      }
      if (user) {
        authenticated = true;
        if (datas && datas.headers && datas.headers['app-id']) {
          cookie.save('APP_ID', datas.headers['app-id'], { path: '/' });
        }
        if (datas && datas.headers && datas.headers['sso-id']) {
          cookie.save('SSO_ID', datas.headers['sso-id'], { path: '/' });
        }
        if (token) {
          cookie.save('Authorization', token, { path: '/' });
        }
        if (autologin) {
          let aYearFromNow = new Date();
          aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
          cookie.save('AutoLogin', autologin, { path: '/', expires: aYearFromNow });
        }
        if (user.config && user.config.ubrk_config) {
          more.settings = JSON.parse(user.config.ubrk_config) || defaultConfig;
        } else {
          more.settings = defaultConfig;
        }
        if (user.config && user.config.ubrk_cache) {
          more.cache = JSON.parse(user.config.ubrk_cache) || {};
          saveToLS('layouts', more.cache);
        } else {
          more.cache = {};
        }
        const ajv = new Ajv({ allErrors: true, verbose: true, useDefaults: true });
        const validate = ajv.compile(schema);
        validate(more.settings);
      }
      return {
        ...state,
        ...more,
        token: token,
        user: user,
        firstCheck: true,
        authenticated: authenticated,
        signInPending: false,
        signInError: null,
      };

    case AUTH_SIGN_IN_FAILURE:
      // The request is failed
      const datas2 = action.data;
      if (datas2 && datas2.headers && datas2.headers['app-id']) {
        cookie.save('APP_ID', datas.headers['app-id'], { path: '/' });
      }
      if (datas2 && datas2.headers && datas2.headers['sso-id']) {
        cookie.save('SSO_ID', datas2.headers['sso-id'], { path: '/' });
      }
      cookie.remove('Authorization', { path: '/' });
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        firstCheck: true,
        signInPending: false,
        signInError: error,
      };

    case AUTH_SIGN_IN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signInError: null,
      };

    default:
      return state;
  }
}
