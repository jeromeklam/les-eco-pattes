import { FAMILY_TOGGLE } from './constants';

export function toggle(id) {
  return {
    type: FAMILY_TOGGLE,
    id: id,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FAMILY_TOGGLE:
      let tree = state.tree;
      tree.toggle(action.id);
      return {
        ...state,
        tree: tree,
      };

    default:
      return state;
  }
}
