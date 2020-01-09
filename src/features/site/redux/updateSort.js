import { SITE_UPDATE_SORT } from './constants';

export function updateSort(col, way, pos = 9) {
  return {
    type: SITE_UPDATE_SORT,
    col: col,
    way: way,
    pos: pos,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_UPDATE_SORT:
      let sort = state.sort;
      let nSort = [];
      sort.forEach(elt => {
        if (elt.col !== action.col) {
          nSort.push(elt);
        }
      });
      if (action.way === 'up' || action.way === 'down') {
        const elt = {
          col: action.col,
          way: action.way,
        };
        if (action.pos >= nSort.length) {
          nSort.push(elt);
        } else {
          nSort = nSort.splice(action.pos - 1, 0, elt);
        }
      }
      return {
        ...state,
        sort: nSort,
      };

    default:
      return state;
  }
}
