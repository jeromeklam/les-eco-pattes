import { Filter, FILTER_MODE_AND, FILTER_OPER_EQUAL } from 'react-bootstrap-front';
import { ALERT_INIT_FILTERS } from './constants';

/**
 *
 */
export const getInitFilters = (enable = true) => {
  let initFilters = new Filter();
  initFilters.addFilter('alert_done_ts', '', FILTER_OPER_EQUAL, false, true, enable);
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
