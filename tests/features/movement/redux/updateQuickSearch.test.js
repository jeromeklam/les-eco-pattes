import {
  MOVEMENT_UPDATE_QUICK_SEARCH,
} from '../../../../src/features/movement/redux/constants';

import {
  updateQuickSearch,
  reducer,
} from '../../../../src/features/movement/redux/updateQuickSearch';

describe('movement/redux/updateQuickSearch', () => {
  it('returns correct action by updateQuickSearch', () => {
    expect(updateQuickSearch()).toHaveProperty('type', MOVEMENT_UPDATE_QUICK_SEARCH);
  });

  it('handles action type MOVEMENT_UPDATE_QUICK_SEARCH correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_UPDATE_QUICK_SEARCH }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
