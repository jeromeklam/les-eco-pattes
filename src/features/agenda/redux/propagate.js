// Rekit uses a new approach to organizing actions and reducers. That is
import { jsonApiNormalizer, normalizedObjectUpdate } from 'jsonapi-front';
import { AGENDA_PROPAGATE } from './constants';

export function propagate(data) {
  return {
    type: AGENDA_PROPAGATE,
    data: data,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AGENDA_PROPAGATE:
      let object = jsonApiNormalizer(action.data.data);
      let myItems = state.events;
      let news = normalizedObjectUpdate(myItems, 'FreeFW_Alert', object, false);
      //console.log("propagate", news);
      return {
        ...state,
        updateOneError: null,
        events: news,
      };

    default:
      return state;
  }
}
