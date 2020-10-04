import { Filter, FILTER_MODE_AND, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL } from 'react-bootstrap-front';
import { ALERT_INIT_FILTERS } from './constants';

/**
 *
 */
export const getInitFilters = (enable = true) => {
  let initFilters = new Filter();
  const now = new Date().toISOString();
  initFilters.addFilter('alert_from', now, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL, false, true, enable);
  initFilters.setMode(FILTER_MODE_AND);    
  return initFilters;
}

export function initFilters(enable) {
  return {
    type: ALERT_INIT_FILTERS,
    enable: enable,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ALERT_INIT_FILTERS:
      let newFilters = getInitFilters(action.enable);   
      return {
        ...state,
        filters: newFilters,
      };

    default:
      return state;
  }
}