import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-tools';
import { CAUSE_MOVEMENT_UPDATE_MODEL } from './constants';

export function updateModel(model) {
  return {
    type: CAUSE_MOVEMENT_UPDATE_MODEL,
    data: model
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_MOVEMENT_UPDATE_MODEL:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = normalizedObjectUpdate(myItems, 'FreeAsso_CauseMovement', object);
      return {
        ...state,
        updateOneError: null,
        items: news,
      };

    default:
      return state;
  }
}
