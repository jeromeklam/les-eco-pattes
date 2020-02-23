import {
  MOVEMENT_INIT_SORT,
} from '../../../../src/features/movement/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/movement/redux/initSort';

describe('movement/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', MOVEMENT_INIT_SORT);
  });

  it('handles action type MOVEMENT_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: MOVEMENT_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
