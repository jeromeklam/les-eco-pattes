import {
  SITE_RELOAD,
} from '../../../../src/features/site/redux/constants';

import {
  reload,
  reducer,
} from '../../../../src/features/site/redux/reload';

describe('site/redux/reload', () => {
  it('returns correct action by reload', () => {
    expect(reload()).toHaveProperty('type', SITE_RELOAD);
  });

  it('handles action type SITE_RELOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_RELOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
