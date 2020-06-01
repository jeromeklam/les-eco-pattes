import {
  HOME_SOCKET_CONNECTED,
} from '../../../../src/features/home/redux/constants';

import {
  socketConnected,
  reducer,
} from '../../../../src/features/home/redux/socketConnected';

describe('home/redux/socketConnected', () => {
  it('returns correct action by socketConnected', () => {
    expect(socketConnected()).toHaveProperty('type', HOME_SOCKET_CONNECTED);
  });

  it('handles action type HOME_SOCKET_CONNECTED correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: HOME_SOCKET_CONNECTED }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
