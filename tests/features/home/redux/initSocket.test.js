import {
  HOME_INIT_SOCKET,
} from '../../../../src/features/home/redux/constants';

import {
  initSocket,
  reducer,
} from '../../../../src/features/home/redux/initSocket';

describe('home/redux/initSocket', () => {
  it('returns correct action by initSocket', () => {
    expect(initSocket()).toHaveProperty('type', HOME_INIT_SOCKET);
  });

  it('handles action type HOME_INIT_SOCKET correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_INIT_SOCKET }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
