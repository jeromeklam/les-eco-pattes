import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_LOAD_TIMERS_BEGIN,
  HOME_LOAD_TIMERS_SUCCESS,
  HOME_LOAD_TIMERS_FAILURE,
  HOME_LOAD_TIMERS_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  loadTimers,
  dismissLoadTimersError,
  reducer,
} from '../../../../src/features/home/redux/loadTimers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loadTimers', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadTimers succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadTimers())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_LOAD_TIMERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_LOAD_TIMERS_SUCCESS);
      });
  });

  it('dispatches failure action when loadTimers fails', () => {
    const store = mockStore({});

    return store.dispatch(loadTimers({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_LOAD_TIMERS_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_LOAD_TIMERS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadTimersError', () => {
    const expectedAction = {
      type: HOME_LOAD_TIMERS_DISMISS_ERROR,
    };
    expect(dismissLoadTimersError()).toEqual(expectedAction);
  });

  it('handles action type HOME_LOAD_TIMERS_BEGIN correctly', () => {
    const prevState = { loadTimersPending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_TIMERS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadTimersPending).toBe(true);
  });

  it('handles action type HOME_LOAD_TIMERS_SUCCESS correctly', () => {
    const prevState = { loadTimersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_TIMERS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadTimersPending).toBe(false);
  });

  it('handles action type HOME_LOAD_TIMERS_FAILURE correctly', () => {
    const prevState = { loadTimersPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_TIMERS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadTimersPending).toBe(false);
    expect(state.loadTimersError).toEqual(expect.anything());
  });

  it('handles action type HOME_LOAD_TIMERS_DISMISS_ERROR correctly', () => {
    const prevState = { loadTimersError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_TIMERS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadTimersError).toBe(null);
  });
});

