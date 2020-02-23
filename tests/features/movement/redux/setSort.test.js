import {
  MOVEMENT_SET_SORT,
} from '../../../../src/features/movement/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/movement/redux/setSort';

describe('movement/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', MOVEMENT_SET_SORT);
  });

  it('handles action type MOVEMENT_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
