import {
  AGENDA_PROPAGATE,
} from '../../../../src/features/agenda/redux/constants';

import {
  propagate,
  reducer,
} from '../../../../src/features/agenda/redux/propagate';

describe('agenda/redux/propagate', () => {
  it('returns correct action by propagate', () => {
    expect(propagate()).toHaveProperty('type', AGENDA_PROPAGATE);
  });

  it('handles action type AGENDA_PROPAGATE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: AGENDA_PROPAGATE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
