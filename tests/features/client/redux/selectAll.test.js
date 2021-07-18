import {
  CLIENT_SELECT_ALL,
} from '../../../../src/features/client/redux/constants';

import {
  selectAll,
  reducer,
} from '../../../../src/features/client/redux/selectAll';

describe('client/redux/selectAll', () => {
  it('returns correct action by selectAll', () => {
    expect(selectAll()).toHaveProperty('type', CLIENT_SELECT_ALL);
  });

  it('handles action type CLIENT_SELECT_ALL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CLIENT_SELECT_ALL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
