import {
  HOME_SOCKET_DISCONNECTED,
} from '../../../../src/features/home/redux/constants';

import {
  socketDisconnected,
  reducer,
} from '../../../../src/features/home/redux/socketDisconnected';

describe('home/redux/socketDisconnected', () => {
  it('returns correct action by socketDisconnected', () => {
    expect(socketDisconnected()).toHaveProperty('type', HOME_SOCKET_DISCONNECTED);
  });

  it('handles action type HOME_SOCKET_DISCONNECTED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SOCKET_DISCONNECTED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
