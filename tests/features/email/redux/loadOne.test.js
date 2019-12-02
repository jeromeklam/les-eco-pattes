import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  EMAIL_LOAD_ONE_BEGIN,
  EMAIL_LOAD_ONE_SUCCESS,
  EMAIL_LOAD_ONE_FAILURE,
  EMAIL_LOAD_ONE_DISMISS_ERROR,
} from '../../../../src/features/email/redux/constants';

import {
  loadOne,
  dismissLoadOneError,
  reducer,
} from '../../../../src/features/email/redux/loadOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('email/redux/loadOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EMAIL_LOAD_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', EMAIL_LOAD_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when loadOne fails', () => {
    const store = mockStore({});

    return store.dispatch(loadOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', EMAIL_LOAD_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', EMAIL_LOAD_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadOneError', () => {
    const expectedAction = {
      type: EMAIL_LOAD_ONE_DISMISS_ERROR,
    };
    expect(dismissLoadOneError()).toEqual(expectedAction);
  });

  it('handles action type EMAIL_LOAD_ONE_BEGIN correctly', () => {
    const prevState = { loadOnePending: false };
    const state = reducer(
      prevState,
      { type: EMAIL_LOAD_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOnePending).toBe(true);
  });

  it('handles action type EMAIL_LOAD_ONE_SUCCESS correctly', () => {
    const prevState = { loadOnePending: true };
    const state = reducer(
      prevState,
      { type: EMAIL_LOAD_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOnePending).toBe(false);
  });

  it('handles action type EMAIL_LOAD_ONE_FAILURE correctly', () => {
    const prevState = { loadOnePending: true };
    const state = reducer(
      prevState,
      { type: EMAIL_LOAD_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOnePending).toBe(false);
    expect(state.loadOneError).toEqual(expect.anything());
  });

  it('handles action type EMAIL_LOAD_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { loadOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: EMAIL_LOAD_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOneError).toBe(null);
  });
});

