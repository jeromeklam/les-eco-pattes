import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENT_TYPE_LOAD_MORE_BEGIN,
  CLIENT_TYPE_LOAD_MORE_SUCCESS,
  CLIENT_TYPE_LOAD_MORE_FAILURE,
  CLIENT_TYPE_LOAD_MORE_DISMISS_ERROR,
} from '../../../../src/features/client-type/redux/constants';

import {
  loadMore,
  dismissLoadMoreError,
  reducer,
} from '../../../../src/features/client-type/redux/loadMore';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('client-type/redux/loadMore', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadMore succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadMore())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_TYPE_LOAD_MORE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_TYPE_LOAD_MORE_SUCCESS);
      });
  });

  it('dispatches failure action when loadMore fails', () => {
    const store = mockStore({});

    return store.dispatch(loadMore({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_TYPE_LOAD_MORE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_TYPE_LOAD_MORE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadMoreError', () => {
    const expectedAction = {
      type: CLIENT_TYPE_LOAD_MORE_DISMISS_ERROR,
    };
    expect(dismissLoadMoreError()).toEqual(expectedAction);
  });

  it('handles action type CLIENT_TYPE_LOAD_MORE_BEGIN correctly', () => {
    const prevState = { loadMorePending: false };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_LOAD_MORE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMorePending).toBe(true);
  });

  it('handles action type CLIENT_TYPE_LOAD_MORE_SUCCESS correctly', () => {
    const prevState = { loadMorePending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_LOAD_MORE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMorePending).toBe(false);
  });

  it('handles action type CLIENT_TYPE_LOAD_MORE_FAILURE correctly', () => {
    const prevState = { loadMorePending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_LOAD_MORE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMorePending).toBe(false);
    expect(state.loadMoreError).toEqual(expect.anything());
  });

  it('handles action type CLIENT_TYPE_LOAD_MORE_DISMISS_ERROR correctly', () => {
    const prevState = { loadMoreError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_LOAD_MORE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMoreError).toBe(null);
  });
});

