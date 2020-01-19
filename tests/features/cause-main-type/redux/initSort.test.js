import {
  CAUSE_MAIN_TYPE_INIT_SORT,
} from '../../../../src/features/cause-main-type/redux/constants';

import {
  initSort,
  reducer,
} from '../../../../src/features/cause-main-type/redux/initSort';

describe('cause-main-type/redux/initSort', () => {
  it('returns correct action by initSort', () => {
    expect(initSort()).toHaveProperty('type', CAUSE_MAIN_TYPE_INIT_SORT);
  });

  it('handles action type CAUSE_MAIN_TYPE_INIT_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_INIT_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
