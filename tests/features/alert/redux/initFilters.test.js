import {
  ALERT_INIT_FILTERS,
} from '../../../../src/features/alert/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/alert/redux/initFilters';

describe('alert/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', ALERT_INIT_FILTERS);
  });

  it('handles action type ALERT_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ALERT_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
