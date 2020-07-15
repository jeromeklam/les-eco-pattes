import {
  CAUSE_SELECT_ALL,
} from '../../../../src/features/cause/redux/constants';

import {
  selectAll,
  reducer,
} from '../../../../src/features/cause/redux/selectAll';

describe('cause/redux/selectAll', () => {
  it('returns correct action by selectAll', () => {
    expect(selectAll()).toHaveProperty('type', CAUSE_SELECT_ALL);
  });

  it('handles action type CAUSE_SELECT_ALL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_SELECT_ALL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
