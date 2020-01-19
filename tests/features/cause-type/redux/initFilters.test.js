import {
  CAUSE_TYPE_INIT_FILTERS,
} from '../../../../src/features/cause-type/redux/constants';

import {
  initFilters,
  reducer,
} from '../../../../src/features/cause-type/redux/initFilters';

describe('cause-type/redux/initFilters', () => {
  it('returns correct action by initFilters', () => {
    expect(initFilters()).toHaveProperty('type', CAUSE_TYPE_INIT_FILTERS);
  });

  it('handles action type CAUSE_TYPE_INIT_FILTERS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_TYPE_INIT_FILTERS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
