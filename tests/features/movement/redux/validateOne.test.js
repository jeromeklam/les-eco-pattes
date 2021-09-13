import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MOVEMENT_VALIDATE_ONE_BEGIN,
  MOVEMENT_VALIDATE_ONE_SUCCESS,
  MOVEMENT_VALIDATE_ONE_FAILURE,
  MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
} from '../../../../src/features/movement/redux/constants';

import {
  validateOne,
  dismissValidateOneError,
  reducer,
} from '../../../../src/features/movement/redux/validateOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('movement/redux/validateOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when validateOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(validateOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MOVEMENT_VALIDATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MOVEMENT_VALIDATE_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when validateOne fails', () => {
    const store = mockStore({});

    return store.dispatch(validateOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MOVEMENT_VALIDATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', MOVEMENT_VALIDATE_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissValidateOneError', () => {
    const expectedAction = {
      type: MOVEMENT_VALIDATE_ONE_DISMISS_ERROR,
    };
    expect(dismissValidateOneError()).toEqual(expectedAction);
  });

  it('handles action type MOVEMENT_VALIDATE_ONE_BEGIN correctly', () => {
    const prevState = { validateOnePending: false };
    const state = reducer(
      prevState,
      { type: MOVEMENT_VALIDATE_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOnePending).toBe(true);
  });

  it('handles action type MOVEMENT_VALIDATE_ONE_SUCCESS correctly', () => {
    const prevState = { validateOnePending: true };
    const state = reducer(
      prevState,
      { type: MOVEMENT_VALIDATE_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOnePending).toBe(false);
  });

  it('handles action type MOVEMENT_VALIDATE_ONE_FAILURE correctly', () => {
    const prevState = { validateOnePending: true };
    const state = reducer(
      prevState,
      { type: MOVEMENT_VALIDATE_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOnePending).toBe(false);
    expect(state.validateOneError).toEqual(expect.anything());
  });

  it('handles action type MOVEMENT_VALIDATE_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { validateOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MOVEMENT_VALIDATE_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.validateOneError).toBe(null);
  });
});

