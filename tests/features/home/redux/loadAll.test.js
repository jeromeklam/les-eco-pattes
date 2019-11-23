import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_LOAD_ALL_BEGIN,
  HOME_LOAD_ALL_SUCCESS,
  HOME_LOAD_ALL_FAILURE,
  HOME_LOAD_ALL_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  loadAll,
  dismissLoadAllError,
  reducer,
} from '../../../../src/features/home/redux/loadAll';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loadAll', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadAll succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadAll())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_LOAD_ALL_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_LOAD_ALL_SUCCESS);
      });
  });

  it('dispatches failure action when loadAll fails', () => {
    const store = mockStore({});

    return store.dispatch(loadAll({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_LOAD_ALL_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_LOAD_ALL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadAllError', () => {
    const expectedAction = {
      type: HOME_LOAD_ALL_DISMISS_ERROR,
    };
    expect(dismissLoadAllError()).toEqual(expectedAction);
  });

  it('handles action type HOME_LOAD_ALL_BEGIN correctly', () => {
    const prevState = { loadAllPending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAllPending).toBe(true);
  });

  it('handles action type HOME_LOAD_ALL_SUCCESS correctly', () => {
    const prevState = { loadAllPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAllPending).toBe(false);
  });

  it('handles action type HOME_LOAD_ALL_FAILURE correctly', () => {
    const prevState = { loadAllPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAllPending).toBe(false);
    expect(state.loadAllError).toEqual(expect.anything());
  });

  it('handles action type HOME_LOAD_ALL_DISMISS_ERROR correctly', () => {
    const prevState = { loadAllError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_ALL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadAllError).toBe(null);
  });
});

