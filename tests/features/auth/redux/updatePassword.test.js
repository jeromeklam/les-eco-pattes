import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_UPDATE_PASSWORD_BEGIN,
  AUTH_UPDATE_PASSWORD_SUCCESS,
  AUTH_UPDATE_PASSWORD_FAILURE,
  AUTH_UPDATE_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  updatePassword,
  dismissUpdatePasswordError,
  reducer,
} from '../../../../src/features/auth/redux/updatePassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/updatePassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updatePassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updatePassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_UPDATE_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_UPDATE_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when updatePassword fails', () => {
    const store = mockStore({});

    return store.dispatch(updatePassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_UPDATE_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_UPDATE_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdatePasswordError', () => {
    const expectedAction = {
      type: AUTH_UPDATE_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissUpdatePasswordError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_UPDATE_PASSWORD_BEGIN correctly', () => {
    const prevState = { updatePasswordPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updatePasswordPending).toBe(true);
  });

  it('handles action type AUTH_UPDATE_PASSWORD_SUCCESS correctly', () => {
    const prevState = { updatePasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updatePasswordPending).toBe(false);
  });

  it('handles action type AUTH_UPDATE_PASSWORD_FAILURE correctly', () => {
    const prevState = { updatePasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updatePasswordPending).toBe(false);
    expect(state.updatePasswordError).toEqual(expect.anything());
  });

  it('handles action type AUTH_UPDATE_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { updatePasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updatePasswordError).toBe(null);
  });
});

