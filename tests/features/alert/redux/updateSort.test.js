import {
  ALERT_UPDATE_SORT,
} from '../../../../src/features/alert/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/alert/redux/updateSort';

describe('alert/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', ALERT_UPDATE_SORT);
  });

  it('handles action type ALERT_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ALERT_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
