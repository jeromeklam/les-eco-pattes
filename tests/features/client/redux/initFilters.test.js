import {
  CLIENT_INIT_FILTERS,
} from '../../../../src/features/client/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/client/redux/initFilters';

describe('client/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CLIENT_INIT_FILTERS);
  });

  it('handles action type CLIENT_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
