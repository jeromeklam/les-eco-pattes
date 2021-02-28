import {
  SITE_ON_SELECT,
} from '../../../../src/features/site/redux/constants';

import {
  onSelect,
  reducer,
} from '../../../../src/features/site/redux/onSelect';

describe('site/redux/onSelect', () => {
  it('returns correct action by onSelect', () => {
    expect(onSelect()).toHaveProperty('type', SITE_ON_SELECT);
  });

  it('handles action type SITE_ON_SELECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_ON_SELECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
