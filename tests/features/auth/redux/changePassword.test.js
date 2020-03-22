import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_CHANGE_PASSWORD_BEGIN,
  AUTH_CHANGE_PASSWORD_SUCCESS,
  AUTH_CHANGE_PASSWORD_FAILURE,
  AUTH_CHANGE_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  changePassword,
  dismissChangePasswordError,
  reducer,
} from '../../../../src/features/auth/redux/changePassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/changePassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when changePassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(changePassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_CHANGE_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_CHANGE_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when changePassword fails', () => {
    const store = mockStore({});

    return store.dispatch(changePassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_CHANGE_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_CHANGE_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissChangePasswordError', () => {
    const expectedAction = {
      type: AUTH_CHANGE_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissChangePasswordError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_CHANGE_PASSWORD_BEGIN correctly', () => {
    const prevState = { changePasswordPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePasswordPending).toBe(true);
  });

  it('handles action type AUTH_CHANGE_PASSWORD_SUCCESS correctly', () => {
    const prevState = { changePasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePasswordPending).toBe(false);
  });

  it('handles action type AUTH_CHANGE_PASSWORD_FAILURE correctly', () => {
    const prevState = { changePasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePasswordPending).toBe(false);
    expect(state.changePasswordError).toEqual(expect.anything());
  });

  it('handles action type AUTH_CHANGE_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { changePasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changePasswordError).toBe(null);
  });
});

