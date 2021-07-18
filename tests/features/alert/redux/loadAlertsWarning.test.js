import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ALERT_LOAD_ALERTS_WARNING_BEGIN,
  ALERT_LOAD_ALERTS_WARNING_SUCCESS,
  ALERT_LOAD_ALERTS_WARNING_FAILURE,
  ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR,
} from '../../../../src/features/alert/redux/constants';

import {
  loadAlertsWarning,
  dismissLoadAlertsWarningError,
  reducer,
} from '../../../../src/features/alert/redux/loadAlertsWarning';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('alert/redux/loadAlertsWarning', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadAlertsWarning succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadAlertsWarning())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ALERT_LOAD_ALERTS_WARNING_BEGIN);
        expect(actions[1]).toHaveProperty('type', ALERT_LOAD_ALERTS_WARNING_SUCCESS);
      });
  });

  it('dispatches failure action when loadAlertsWarning fails', () => {
    const store = mockStore({});

    return store.dispatch(loadAlertsWarning({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ALERT_LOAD_ALERTS_WARNING_BEGIN);
        expect(actions[1]).toHaveProperty('type', ALERT_LOAD_ALERTS_WARNING_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadAlertsWarningError', () => {
    const expectedAction = {
      type: ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR,
    };
    expect(dismissLoadAlertsWarningError()).toEqual(expectedAction);
  });

  it('handles action type ALERT_LOAD_ALERTS_WARNING_BEGIN correctly', () => {
    const prevState = { loadAlertsWarningPending: false };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_WARNING_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsWarningPending).toBe(true);
  });

  it('handles action type ALERT_LOAD_ALERTS_WARNING_SUCCESS correctly', () => {
    const prevState = { loadAlertsWarningPending: true };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_WARNING_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsWarningPending).toBe(false);
  });

  it('handles action type ALERT_LOAD_ALERTS_WARNING_FAILURE correctly', () => {
    const prevState = { loadAlertsWarningPending: true };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_WARNING_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsWarningPending).toBe(false);
    expect(state.loadAlertsWarningError).toEqual(expect.anything());
  });

  it('handles action type ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR correctly', () => {
    const prevState = { loadAlertsWarningError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ALERT_LOAD_ALERTS_WARNING_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAlertsWarningError).toBe(null);
  });
});

