import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN,
  CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS,
  CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE,
  CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
} from '../../../../src/features/cause-movement/redux/constants';

import {
  validateOne,
  dismissValidateOneError,
  reducer,
} from '../../../../src/features/cause-movement/redux/validateOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause-movement/redux/validateOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when validateOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(validateOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when validateOne fails', () => {
    const store = mockStore({});

    return store.dispatch(validateOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissValidateOneError', () => {
    const expectedAction = {
      type: CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
    };
    expect(dismissValidateOneError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN correctly', () => {
    const prevState = { validateOnePending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_VALIDATE_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOnePending).toBe(true);
  });

  it('handles action type CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS correctly', () => {
    const prevState = { validateOnePending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_VALIDATE_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOnePending).toBe(false);
  });

  it('handles action type CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE correctly', () => {
    const prevState = { validateOnePending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_VALIDATE_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOnePending).toBe(false);
    expect(state.validateOneError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { validateOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_VALIDATE_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOneError).toBe(null);
  });
});

