import {
  SITE_TYPE_RELOAD,
} from '../../../../src/features/site-type/redux/constants';

import {
  reload,
  reducer,
} from '../../../../src/features/site-type/redux/reload';

describe('site-type/redux/reload', () => {
  it('returns correct action by reload', () => {
    expect(reload()).toHaveProperty('type', SITE_TYPE_RELOAD);
  });

  it('handles action type SITE_TYPE_RELOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_TYPE_RELOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
