import {
  CAUSE_TYPE_RELOAD,
} from '../../../../src/features/cause-type/redux/constants';

import {
  reload,
  reducer,
} from '../../../../src/features/cause-type/redux/reload';

describe('cause-type/redux/reload', () => {
  it('returns correct action by reload', () => {
    expect(reload()).toHaveProperty('type', CAUSE_TYPE_RELOAD);
  });

  it('handles action type CAUSE_TYPE_RELOAD correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_TYPE_RELOAD }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
