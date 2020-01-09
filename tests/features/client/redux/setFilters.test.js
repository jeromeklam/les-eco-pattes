import {
  CLIENT_SET_FILTERS,
} from '../../../../src/features/client/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/client/redux/setFilters';

describe('client/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', CLIENT_SET_FILTERS);
  });

  it('handles action type CLIENT_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
