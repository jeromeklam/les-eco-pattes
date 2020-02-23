import {
  MOVEMENT_SET_FILTERS,
} from '../../../../src/features/movement/redux/constants';

import {
  setFilters,
  reducer,
} from '../../../../src/features/movement/redux/setFilters';

describe('movement/redux/setFilters', () => {
  it('returns correct action by setFilters', () => {
    expect(setFilters()).toHaveProperty('type', MOVEMENT_SET_FILTERS);
  });

  it('handles action type MOVEMENT_SET_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_SET_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
