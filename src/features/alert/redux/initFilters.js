import { Filter, FILTER_MODE_AND, FILTER_OPER_EMPTY } from 'react-bootstrap-front';
import { ALERT_INIT_FILTERS } from './constants';

/**
 *
 */
export const getInitFilters = (enable = true) => {
  let initFilters = new Filter();
  initFilters.addFilter('alert_done_ts', '', FILTER_OPER_EMPTY, false, true, enable);
  initFilters.setMode(FILTER_MODE_AND);
  return initFilters;
};

export function initFilters(def) {
  return {
    type: ALERT_INIT_FILTERS,
    def: def,
  };
}

/**
 * Reducer
 * 
 * @param {Object} state  Etat courant de la mémoire (store)
 * @param {Object} action Action à réaliser sur cet état avec options
 */
 export function reducer(state, action) {
  switch (action.type) {
    case ALERT_INIT_FILTERS:
      let initialFilters = getInitFilters();
      initialFilters.setMode(FILTER_MODE_AND);
      if (action.def) { 
        initialFilters.disableDefaults();
      } else {
        initialFilters.enableDefaults();
      }
      return {
        ...state,
        filters: initialFilters,
      };

    default:
      return state;
  }
}