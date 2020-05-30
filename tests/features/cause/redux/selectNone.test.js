import {
  CAUSE_SELECT_NONE,
} from '../../../../src/features/cause/redux/constants';

import {
  selectNone,
  reducer,
} from '../../../../src/features/cause/redux/selectNone';

describe('cause/redux/selectNone', () => {
  it('returns correct action by selectNone', () => {
    expect(selectNone()).toHaveProperty('type', CAUSE_SELECT_NONE);
  });

  it('handles action type CAUSE_SELECT_NONE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_SELECT_NONE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
