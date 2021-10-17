import { CAUSE_INIT_SORT } from './constants';

/**
 * Initialisation du tri de la liste
 */
export function initSort() {
  return {
    type: CAUSE_INIT_SORT,
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
    case CAUSE_INIT_SORT:
      return {
        ...state,
        sort: [
          { col: 'cau_code', way: 'up' },
          { col: 'cau_name', way: 'up' },
        ],
      };

    default:
      return state;
  }
}
