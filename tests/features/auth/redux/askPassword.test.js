import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_ASK_PASSWORD_BEGIN,
  AUTH_ASK_PASSWORD_SUCCESS,
  AUTH_ASK_PASSWORD_FAILURE,
  AUTH_ASK_PASSWORD_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  askPassword,
  dismissAskPasswordError,
  reducer,
} from '../../../../src/features/auth/redux/askPassword';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/askPassword', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when askPassword succeeds', () => {
    const store = mockStore({});

    return store.dispatch(askPassword())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_ASK_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_ASK_PASSWORD_SUCCESS);
      });
  });

  it('dispatches failure action when askPassword fails', () => {
    const store = mockStore({});

    return store.dispatch(askPassword({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_ASK_PASSWORD_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_ASK_PASSWORD_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAskPasswordError', () => {
    const expectedAction = {
      type: AUTH_ASK_PASSWORD_DISMISS_ERROR,
    };
    expect(dismissAskPasswordError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_ASK_PASSWORD_BEGIN correctly', () => {
    const prevState = { askPasswordPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_ASK_PASSWORD_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.askPasswordPending).toBe(true);
  });

  it('handles action type AUTH_ASK_PASSWORD_SUCCESS correctly', () => {
    const prevState = { askPasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_ASK_PASSWORD_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.askPasswordPending).toBe(false);
  });

  it('handles action type AUTH_ASK_PASSWORD_FAILURE correctly', () => {
    const prevState = { askPasswordPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_ASK_PASSWORD_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.askPasswordPending).toBe(false);
    expect(state.askPasswordError).toEqual(expect.anything());
  });

  it('handles action type AUTH_ASK_PASSWORD_DISMISS_ERROR correctly', () => {
    const prevState = { askPasswordError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_ASK_PASSWORD_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.askPasswordError).toBe(null);
  });
});

