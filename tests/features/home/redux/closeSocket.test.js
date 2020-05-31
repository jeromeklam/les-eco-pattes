import {
  HOME_CLOSE_SOCKET,
} from '../../../../src/features/home/redux/constants';

import {
  closeSocket,
  reducer,
} from '../../../../src/features/home/redux/closeSocket';

describe('home/redux/closeSocket', () => {
  it('returns correct action by closeSocket', () => {
    expect(closeSocket()).toHaveProperty('type', HOME_CLOSE_SOCKET);
  });

  it('handles action type HOME_CLOSE_SOCKET correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_CLOSE_SOCKET }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
