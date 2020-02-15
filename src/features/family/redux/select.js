import { FAMILY_SELECT } from './constants';

export function select(id) {
  return {
    type: FAMILY_SELECT,
    id: id,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FAMILY_SELECT:
      let tree = state.tree;
      tree.select(action.id);
      return {
        ...state,
        tree: tree,
      };

    default:
      return state;
  }
}
