import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AUTH_CHANGE_SETTING_BEGIN,
  AUTH_CHANGE_SETTING_SUCCESS,
  AUTH_CHANGE_SETTING_FAILURE,
  AUTH_CHANGE_SETTING_DISMISS_ERROR,
} from '../../../../src/features/auth/redux/constants';

import {
  changeSetting,
  dismissChangeSettingError,
  reducer,
} from '../../../../src/features/auth/redux/changeSetting';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('auth/redux/changeSetting', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when changeSetting succeeds', () => {
    const store = mockStore({});

    return store.dispatch(changeSetting())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_CHANGE_SETTING_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_CHANGE_SETTING_SUCCESS);
      });
  });

  it('dispatches failure action when changeSetting fails', () => {
    const store = mockStore({});

    return store.dispatch(changeSetting({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AUTH_CHANGE_SETTING_BEGIN);
        expect(actions[1]).toHaveProperty('type', AUTH_CHANGE_SETTING_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissChangeSettingError', () => {
    const expectedAction = {
      type: AUTH_CHANGE_SETTING_DISMISS_ERROR,
    };
    expect(dismissChangeSettingError()).toEqual(expectedAction);
  });

  it('handles action type AUTH_CHANGE_SETTING_BEGIN correctly', () => {
    const prevState = { changeSettingPending: false };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_SETTING_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeSettingPending).toBe(true);
  });

  it('handles action type AUTH_CHANGE_SETTING_SUCCESS correctly', () => {
    const prevState = { changeSettingPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_SETTING_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeSettingPending).toBe(false);
  });

  it('handles action type AUTH_CHANGE_SETTING_FAILURE correctly', () => {
    const prevState = { changeSettingPending: true };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_SETTING_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeSettingPending).toBe(false);
    expect(state.changeSettingError).toEqual(expect.anything());
  });

  it('handles action type AUTH_CHANGE_SETTING_DISMISS_ERROR correctly', () => {
    const prevState = { changeSettingError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AUTH_CHANGE_SETTING_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.changeSettingError).toBe(null);
  });
});

