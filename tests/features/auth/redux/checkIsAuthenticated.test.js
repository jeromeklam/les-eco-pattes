import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_CHECK_IS_AUTHENTICATED_BEGIN,
  AUTH_CHECK_IS_AUTHENTICATED_SUCCESS,
  AUTH_CHECK_IS_AUTHENTICATED_FAILURE,
  AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  checkIsAuthenticated,
  dismissCheckIsAuthenticatedError,
  reducer,
} from '../../../../src/features/auth/redux/checkIsAuthenticated';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/checkIsAuthenticated', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when checkIsAuthenticated succeeds', () => {
    const store = mockStore({});

    return store.dispatch(checkIsAuthenticated())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_CHECK_IS_AUTHENTICATED_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_CHECK_IS_AUTHENTICATED_SUCCESS);
      });
  });

  it('dispatches failure action when checkIsAuthenticated fails', () => {
    const store = mockStore({});

    return store.dispatch(checkIsAuthenticated({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_CHECK_IS_AUTHENTICATED_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_CHECK_IS_AUTHENTICATED_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCheckIsAuthenticatedError', () => {
    const expectedAction = {
      type: AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR,
    };
    expect(dismissCheckIsAuthenticatedError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_CHECK_IS_AUTHENTICATED_BEGIN correctly', () => {
    const prevState = { checkIsAuthenticatedPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_CHECK_IS_AUTHENTICATED_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkIsAuthenticatedPending).toBe(true);
  });

  it('handles action type AUTH_CHECK_IS_AUTHENTICATED_SUCCESS correctly', () => {
    const prevState = { checkIsAuthenticatedPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CHECK_IS_AUTHENTICATED_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkIsAuthenticatedPending).toBe(false);
  });

  it('handles action type AUTH_CHECK_IS_AUTHENTICATED_FAILURE correctly', () => {
    const prevState = { checkIsAuthenticatedPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CHECK_IS_AUTHENTICATED_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkIsAuthenticatedPending).toBe(false);
    expect(state.checkIsAuthenticatedError).toEqual(expect.anything());
  });

  it('handles action type AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR correctly', () => {
    const prevState = { checkIsAuthenticatedError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.checkIsAuthenticatedError).toBe(null);
  });
});

