import {
  CLIENT_SELECT_NONE,
} from '../../../../src/features/client/redux/constants';

import {
  selectNone,
  reducer,
} from '../../../../src/features/client/redux/selectNone';

describe('client/redux/selectNone', () => {
  it('returns correct action by selectNone', () => {
    expect(selectNone()).toHaveProperty('type', CLIENT_SELECT_NONE);
  });

  it('handles action type CLIENT_SELECT_NONE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_SELECT_NONE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
