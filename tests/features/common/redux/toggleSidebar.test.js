import {
  COMMON_TOGGLE_SIDEBAR,
} from '../../../../src/features/common/redux/constants';

import {
  toggleSidebar,
  reducer,
} from '../../../../src/features/common/redux/toggleSidebar';

describe('common/redux/toggleSidebar', () => {
  it('returns correct action by toggleSidebar', () => {
    expect(toggleSidebar()).toHaveProperty('type', COMMON_TOGGLE_SIDEBAR);
  });

  it('handles action type COMMON_TOGGLE_SIDEBAR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: COMMON_TOGGLE_SIDEBAR }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
