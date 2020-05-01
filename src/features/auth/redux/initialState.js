import { defaultConfig } from '../';

const initialState = {
  firstCheck: false,
  authenticated: false,
  user: false,
  settings: defaultConfig,
  cache: false,
  token: false,
  checkIsAuthenticatedPending: false,
  checkIsAuthenticatedError: null,
  signInPending: false,
  signInError: null,
  signOutPending: false,
  signOutError: null,
  locale: 'fr',
  askPasswordPending: false,
  askPasswordError: null,
  changePasswordPending: false,
  changePasswordError: null,
  updateOnePending: false,
  updateOneError: null,
  updatePasswordPending: false,
  updatePasswordError: null,
  updateConfigPending: false,
  updateConfigError: null,
  changeSettingPending: false,
  changeSettingError: null,
};

export default initialState;
