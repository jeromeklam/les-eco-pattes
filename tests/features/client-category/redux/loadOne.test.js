import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENT_CATEGORY_LOAD_ONE_BEGIN,
  CLIENT_CATEGORY_LOAD_ONE_SUCCESS,
  CLIENT_CATEGORY_LOAD_ONE_FAILURE,
  CLIENT_CATEGORY_LOAD_ONE_DISMISS_ERROR,
} from '../../../../src/features/client-category/redux/constants';

import {
  loadOne,
  dismissLoadOneError,
  reducer,
} from '../../../../src/features/client-category/redux/loadOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('client-category/redux/loadOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_CATEGORY_LOAD_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_CATEGORY_LOAD_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when loadOne fails', () => {
    const store = mockStore({});

    return store.dispatch(loadOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_CATEGORY_LOAD_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_CATEGORY_LOAD_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadOneError', () => {
    const expectedAction = {
      type: CLIENT_CATEGORY_LOAD_ONE_DISMISS_ERROR,
    };
    expect(dismissLoadOneError()).toEqual(expectedAction);
  });

  it('handles action type CLIENT_CATEGORY_LOAD_ONE_BEGIN correctly', () => {
    const prevState = { loadOnePending: false };
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_LOAD_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOnePending).toBe(true);
  });

  it('handles action type CLIENT_CATEGORY_LOAD_ONE_SUCCESS correctly', () => {
    const prevState = { loadOnePending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_LOAD_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOnePending).toBe(false);
  });

  it('handles action type CLIENT_CATEGORY_LOAD_ONE_FAILURE correctly', () => {
    const prevState = { loadOnePending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_LOAD_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOnePending).toBe(false);
    expect(state.loadOneError).toEqual(expect.anything());
  });

  it('handles action type CLIENT_CATEGORY_LOAD_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { loadOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENT_CATEGORY_LOAD_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadOneError).toBe(null);
  });
});

