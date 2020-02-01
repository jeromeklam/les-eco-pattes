import {
  HOME_SET_COORDS,
} from '../../../../src/features/home/redux/constants';

import {
  setCoords,
  reducer,
} from '../../../../src/features/home/redux/setCoords';

describe('home/redux/setCoords', () => {
  it('returns correct action by setCoords', () => {
    expect(setCoords()).toHaveProperty('type', HOME_SET_COORDS);
  });

  it('handles action type HOME_SET_COORDS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SET_COORDS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
