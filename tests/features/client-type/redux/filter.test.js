import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENT_TYPE_FILTER_BEGIN,
  CLIENT_TYPE_FILTER_SUCCESS,
  CLIENT_TYPE_FILTER_FAILURE,
  CLIENT_TYPE_FILTER_DISMISS_ERROR,
} from '../../../../src/features/client-type/redux/constants';

import {
  filter,
  dismissFilterError,
  reducer,
} from '../../../../src/features/client-type/redux/filter';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('client-type/redux/filter', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when filter succeeds', () => {
    const store = mockStore({});

    return store.dispatch(filter())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_TYPE_FILTER_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_TYPE_FILTER_SUCCESS);
      });
  });

  it('dispatches failure action when filter fails', () => {
    const store = mockStore({});

    return store.dispatch(filter({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_TYPE_FILTER_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_TYPE_FILTER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissFilterError', () => {
    const expectedAction = {
      type: CLIENT_TYPE_FILTER_DISMISS_ERROR,
    };
    expect(dismissFilterError()).toEqual(expectedAction);
  });

  it('handles action type CLIENT_TYPE_FILTER_BEGIN correctly', () => {
    const prevState = { filterPending: false };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_FILTER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filterPending).toBe(true);
  });

  it('handles action type CLIENT_TYPE_FILTER_SUCCESS correctly', () => {
    const prevState = { filterPending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_FILTER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filterPending).toBe(false);
  });

  it('handles action type CLIENT_TYPE_FILTER_FAILURE correctly', () => {
    const prevState = { filterPending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_FILTER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filterPending).toBe(false);
    expect(state.filterError).toEqual(expect.anything());
  });

  it('handles action type CLIENT_TYPE_FILTER_DISMISS_ERROR correctly', () => {
    const prevState = { filterError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENT_TYPE_FILTER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.filterError).toBe(null);
  });
});

