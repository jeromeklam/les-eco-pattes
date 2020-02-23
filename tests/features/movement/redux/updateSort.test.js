import {
  MOVEMENT_UPDATE_SORT,
} from '../../../../src/features/movement/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/movement/redux/updateSort';

describe('movement/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', MOVEMENT_UPDATE_SORT);
  });

  it('handles action type MOVEMENT_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
