import {
  ALERT_SET_SORT,
} from '../../../../src/features/alert/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/alert/redux/setSort';

describe('alert/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', ALERT_SET_SORT);
  });

  it('handles action type ALERT_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ALERT_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
