import {
  SITE_SELECT_ALL,
} from '../../../../src/features/site/redux/constants';

import {
  selectAll,
  reducer,
} from '../../../../src/features/site/redux/selectAll';

describe('site/redux/selectAll', () => {
  it('returns correct action by selectAll', () => {
    expect(selectAll()).toHaveProperty('type', SITE_SELECT_ALL);
  });

  it('handles action type SITE_SELECT_ALL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SITE_SELECT_ALL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
