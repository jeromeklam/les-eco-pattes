import {
  FAMILY_SELECT,
} from '../../../../src/features/family/redux/constants';

import {
  select,
  reducer,
} from '../../../../src/features/family/redux/select';

describe('family/redux/select', () => {
  it('returns correct action by select', () => {
    expect(select()).toHaveProperty('type', FAMILY_SELECT);
  });

  it('handles action type FAMILY_SELECT correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: FAMILY_SELECT }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
