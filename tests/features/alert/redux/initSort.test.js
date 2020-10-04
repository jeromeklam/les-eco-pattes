import {
  ALERT_INIT_SORT,
} from '../../../../src/features/alert/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/alert/redux/initSort';

describe('alert/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', ALERT_INIT_SORT);
  });

  it('handles action type ALERT_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ALERT_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
