import {
  SITE_TYPE_UPDATE_ONE,
} from '../../../../src/features/site-type/redux/constants';

import {
  updateOne,
  reducer,
} from '../../../../src/features/site-type/redux/updateOne';

describe('site-type/redux/updateOne', () => {
  it('returns correct action by updateOne', () => {
    expect(updateOne()).toHaveProperty('type', SITE_TYPE_UPDATE_ONE);
  });

  it('handles action type SITE_TYPE_UPDATE_ONE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_TYPE_UPDATE_ONE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
