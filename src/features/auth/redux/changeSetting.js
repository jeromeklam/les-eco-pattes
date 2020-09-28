import { getJsonApi } from 'jsonapi-front';
import {
  AUTH_CHANGE_SETTING_BEGIN,
  AUTH_CHANGE_SETTING_SUCCESS,
  AUTH_CHANGE_SETTING_FAILURE,
  AUTH_CHANGE_SETTING_DISMISS_ERROR,
} from './constants';
import { freeAssoApi } from '../../../common';

export function changeSetting(main, setting, value) {
  return (dispatch, getState) => {
    dispatch({
      type: AUTH_CHANGE_SETTING_BEGIN,
      main: main,
      setting: setting,
      value: value,
    });
    const promise = new Promise((resolve, reject) => {
      const settings = getState().auth.settings;
      let config = JSON.parse(JSON.stringify(settings));
      console.log(config);
      if (!config[main]) {
        config[main] = {};
      }
      config[main][setting] = value;
      const datas = {
        type: 'FreeSSO_ConfigRequest',
        config: JSON.stringify(config),
        config_type: 'settings',
      };
      let args = getJsonApi(datas);
      console.log(args);
      const doRequest = freeAssoApi.post('/v1/sso/update-config', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_CHANGE_SETTING_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_CHANGE_SETTING_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissChangeSettingError() {
  return {
    type: AUTH_CHANGE_SETTING_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_CHANGE_SETTING_BEGIN:
      // Just after a request is sent
      let settings = state.settings;
      if (!settings[action.main]) {
        settings[action.main] = {};
      }
      settings[action.main][action.setting] = action.value;
      return {
        ...state,
        changeSettingPending: true,
        changeSettingError: null,
        settings: settings,
      };

    case AUTH_CHANGE_SETTING_SUCCESS:
      // The request is success
      return {
        ...state,
        changeSettingPending: false,
        changeSettingError: null,
      };

    case AUTH_CHANGE_SETTING_FAILURE:
      // The request is failed
      return {
        ...state,
        changeSettingPending: false,
        changeSettingError: action.data.error,
      };

    case AUTH_CHANGE_SETTING_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        changeSettingError: null,
      };

    default:
      return state;
  }
}
