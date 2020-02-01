import { HOME_SET_COORDS } from './constants';

export function setCoords(coord) {
  return {
    type: HOME_SET_COORDS,
    data: coord,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_SET_COORDS:
      return {
        ...state,
        geoOn: true,
        geoCoord: action.data,
      };

    default:
      return state;
  }
}
