import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  DATA_UPDATE_ONE_BEGIN,
  DATA_UPDATE_ONE_SUCCESS,
  DATA_UPDATE_ONE_FAILURE,
  DATA_UPDATE_ONE_DISMISS_ERROR,
} from '../../../../src/features/data/redux/constants';

import {
  updateOne,
  dismissUpdateOneError,
  reducer,
} from '../../../../src/features/data/redux/updateOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('data/redux/updateOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DATA_UPDATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', DATA_UPDATE_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when updateOne fails', () => {
    const store = mockStore({});

    return store.dispatch(updateOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', DATA_UPDATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', DATA_UPDATE_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateOneError', () => {
    const expectedAction = {
      type: DATA_UPDATE_ONE_DISMISS_ERROR,
    };
    expect(dismissUpdateOneError()).toEqual(expectedAction);
  });

  it('handles action type DATA_UPDATE_ONE_BEGIN correctly', () => {
    const prevState = { updateOnePending: false };
    const state = reducer(
      prevState,
      { type: DATA_UPDATE_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateOnePending).toBe(true);
  });

  it('handles action type DATA_UPDATE_ONE_SUCCESS correctly', () => {
    const prevState = { updateOnePending: true };
    const state = reducer(
      prevState,
      { type: DATA_UPDATE_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateOnePending).toBe(false);
  });

  it('handles action type DATA_UPDATE_ONE_FAILURE correctly', () => {
    const prevState = { updateOnePending: true };
    const state = reducer(
      prevState,
      { type: DATA_UPDATE_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateOnePending).toBe(false);
    expect(state.updateOneError).toEqual(expect.anything());
  });

  it('handles action type DATA_UPDATE_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { updateOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: DATA_UPDATE_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateOneError).toBe(null);
  });
});

