import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_SIGN_OUT_BEGIN,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
  AUTH_SIGN_OUT_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  signOut,
  dismissSignOutError,
  reducer,
} from '../../../../src/features/auth/redux/signOut';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/signOut', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when signOut succeeds', () => {
    const store = mockStore({});

    return store.dispatch(signOut())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_SIGN_OUT_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_SIGN_OUT_SUCCESS);
      });
  });

  it('dispatches failure action when signOut fails', () => {
    const store = mockStore({});

    return store.dispatch(signOut({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_SIGN_OUT_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_SIGN_OUT_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissSignOutError', () => {
    const expectedAction = {
      type: AUTH_SIGN_OUT_DISMISS_ERROR,
    };
    expect(dismissSignOutError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_SIGN_OUT_BEGIN correctly', () => {
    const prevState = { signOutPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_SIGN_OUT_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signOutPending).toBe(true);
  });

  it('handles action type AUTH_SIGN_OUT_SUCCESS correctly', () => {
    const prevState = { signOutPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_SIGN_OUT_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signOutPending).toBe(false);
  });

  it('handles action type AUTH_SIGN_OUT_FAILURE correctly', () => {
    const prevState = { signOutPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_SIGN_OUT_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signOutPending).toBe(false);
    expect(state.signOutError).toEqual(expect.anything());
  });

  it('handles action type AUTH_SIGN_OUT_DISMISS_ERROR correctly', () => {
    const prevState = { signOutError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_SIGN_OUT_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.signOutError).toBe(null);
  });
});

