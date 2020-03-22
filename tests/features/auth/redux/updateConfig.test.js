import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_UPDATE_CONFIG_BEGIN,
  AUTH_UPDATE_CONFIG_SUCCESS,
  AUTH_UPDATE_CONFIG_FAILURE,
  AUTH_UPDATE_CONFIG_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  updateConfig,
  dismissUpdateConfigError,
  reducer,
} from '../../../../src/features/auth/redux/updateConfig';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/updateConfig', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateConfig succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateConfig())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_UPDATE_CONFIG_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_UPDATE_CONFIG_SUCCESS);
      });
  });

  it('dispatches failure action when updateConfig fails', () => {
    const store = mockStore({});

    return store.dispatch(updateConfig({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_UPDATE_CONFIG_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_UPDATE_CONFIG_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateConfigError', () => {
    const expectedAction = {
      type: AUTH_UPDATE_CONFIG_DISMISS_ERROR,
    };
    expect(dismissUpdateConfigError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_UPDATE_CONFIG_BEGIN correctly', () => {
    const prevState = { updateConfigPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_CONFIG_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateConfigPending).toBe(true);
  });

  it('handles action type AUTH_UPDATE_CONFIG_SUCCESS correctly', () => {
    const prevState = { updateConfigPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_CONFIG_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateConfigPending).toBe(false);
  });

  it('handles action type AUTH_UPDATE_CONFIG_FAILURE correctly', () => {
    const prevState = { updateConfigPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_CONFIG_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateConfigPending).toBe(false);
    expect(state.updateConfigError).toEqual(expect.anything());
  });

  it('handles action type AUTH_UPDATE_CONFIG_DISMISS_ERROR correctly', () => {
    const prevState = { updateConfigError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_UPDATE_CONFIG_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateConfigError).toBe(null);
  });
});

