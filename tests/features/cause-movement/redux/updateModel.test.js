import {
  CAUSE_MOVEMENT_UPDATE_MODEL,
} from '../../../../src/features/cause-movement/redux/constants';

import {
  updateModel,
  reducer,
} from '../../../../src/features/cause-movement/redux/updateModel';

describe('cause-movement/redux/updateModel', () => {
  it('returns correct action by updateModel', () => {
    expect(updateModel()).toHaveProperty('type', CAUSE_MOVEMENT_UPDATE_MODEL);
  });

  it('handles action type CAUSE_MOVEMENT_UPDATE_MODEL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_UPDATE_MODEL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
