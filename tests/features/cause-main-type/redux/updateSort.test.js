import {
  CAUSE_MAIN_TYPE_UPDATE_SORT,
} from '../../../../src/features/cause-main-type/redux/constants';

import {
  updateSort,
  reducer,
} from '../../../../src/features/cause-main-type/redux/updateSort';

describe('cause-main-type/redux/updateSort', () => {
  it('returns correct action by updateSort', () => {
    expect(updateSort()).toHaveProperty('type', CAUSE_MAIN_TYPE_UPDATE_SORT);
  });

  it('handles action type CAUSE_MAIN_TYPE_UPDATE_SORT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_UPDATE_SORT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
