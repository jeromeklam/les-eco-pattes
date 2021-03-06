import {
  MOVEMENT_INIT_FILTERS,
} from '../../../../src/features/movement/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/movement/redux/initFilters';

describe('movement/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', MOVEMENT_INIT_FILTERS);
  });

  it('handles action type MOVEMENT_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
