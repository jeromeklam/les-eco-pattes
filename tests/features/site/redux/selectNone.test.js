import {
  SITE_SELECT_NONE,
} from '../../../../src/features/site/redux/constants';

import {
  selectNone,
  reducer,
} from '../../../../src/features/site/redux/selectNone';

describe('site/redux/selectNone', () => {
  it('returns correct action by selectNone', () => {
    expect(selectNone()).toHaveProperty('type', SITE_SELECT_NONE);
  });

  it('handles action type SITE_SELECT_NONE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_SELECT_NONE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
