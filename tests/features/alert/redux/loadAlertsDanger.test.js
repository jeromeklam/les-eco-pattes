import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ALERT_LOAD_ALERTS_DANGER_BEGIN,
  ALERT_LOAD_ALERTS_DANGER_SUCCESS,
  ALERT_LOAD_ALERTS_DANGER_FAILURE,
  ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR,
} from '../../../../src/features/alert/redux/constants';

import {
  loadAlertsDanger,
  dismissLoadAlertsDangerError,
  reducer,
} from '../../../../src/features/alert/redux/loadAlertsDanger';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('alert/redux/loadAlertsDanger', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadAlertsDanger succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadAlertsDanger())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ALERT_LOAD_ALERTS_DANGER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ALERT_LOAD_ALERTS_DANGER_SUCCESS);
      });
  });

  it('dispatches failure action when loadAlertsDanger fails', () => {
    const store = mockStore({});

    return store.dispatch(loadAlertsDanger({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ALERT_LOAD_ALERTS_DANGER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ALERT_LOAD_ALERTS_DANGER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadAlertsDangerError', () => {
    const expectedAction = {
      type: ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR,
    };
    expect(dismissLoadAlertsDangerError()).toEqual(expectedAction);
  });

  it('handles action type ALERT_LOAD_ALERTS_DANGER_BEGIN correctly', () => {
    const prevState = { loadAlertsDangerPending: false };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_DANGER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsDangerPending).toBe(true);
  });

  it('handles action type ALERT_LOAD_ALERTS_DANGER_SUCCESS correctly', () => {
    const prevState = { loadAlertsDangerPending: true };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_DANGER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsDangerPending).toBe(false);
  });

  it('handles action type ALERT_LOAD_ALERTS_DANGER_FAILURE correctly', () => {
    const prevState = { loadAlertsDangerPending: true };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_DANGER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsDangerPending).toBe(false);
    expect(state.loadAlertsDangerError).toEqual(expect.anything());
  });

  it('handles action type ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR correctly', () => {
    const prevState = { loadAlertsDangerError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_DANGER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsDangerError).toBe(null);
  });
});

