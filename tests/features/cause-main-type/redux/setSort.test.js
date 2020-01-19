import {
  CAUSE_MAIN_TYPE_SET_SORT,
} from '../../../../src/features/cause-main-type/redux/constants';

import {
  setSort,
  reducer,
} from '../../../../src/features/cause-main-type/redux/setSort';

describe('cause-main-type/redux/setSort', () => {
  it('returns correct action by setSort', () => {
    expect(setSort()).toHaveProperty('type', CAUSE_MAIN_TYPE_SET_SORT);
  });

  it('handles action type CAUSE_MAIN_TYPE_SET_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_SET_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
