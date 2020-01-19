import {
  CLIENT_TYPE_INIT_FILTERS,
} from '../../../../src/features/client-type/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/client-type/redux/initFilters';

describe('client-type/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CLIENT_TYPE_INIT_FILTERS);
  });

  it('handles action type CLIENT_TYPE_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
