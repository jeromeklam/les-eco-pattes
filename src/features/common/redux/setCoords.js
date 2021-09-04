import {
  COMMON_SET_COORDS,
} from './constants';

export function setCoords(coord) {
  return {
    type: COMMON_SET_COORDS,
    data: coord,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COMMON_SET_COORDS:
      return {
        ...state,
        geoOn: true,
        geoCoord: action.data,
      };

    default:
      return state;
  }
}
