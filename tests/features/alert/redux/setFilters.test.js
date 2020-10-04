import {
  ALERT_SET_FILTERS,
} from '../../../../src/features/alert/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/alert/redux/setFilters';

describe('alert/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', ALERT_SET_FILTERS);
  });

  it('handles action type ALERT_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ALERT_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
