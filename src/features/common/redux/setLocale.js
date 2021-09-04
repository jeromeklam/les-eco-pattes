import { COMMON_SET_LOCALE } from './constants';

export function setLocale(locale) {
  return {
    type: COMMON_SET_LOCALE,
    locale: locale,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };

    default:
      return state;
  }
}
