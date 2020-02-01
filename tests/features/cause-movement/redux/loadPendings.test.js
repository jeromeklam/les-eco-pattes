import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_MOVEMENT_LOAD_PENDINGS_BEGIN,
  CAUSE_MOVEMENT_LOAD_PENDINGS_SUCCESS,
  CAUSE_MOVEMENT_LOAD_PENDINGS_FAILURE,
  CAUSE_MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR,
} from '../../../../src/features/cause-movement/redux/constants';

import {
  loadPendings,
  dismissLoadPendingsError,
  reducer,
} from '../../../../src/features/cause-movement/redux/loadPendings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause-movement/redux/loadPendings', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadPendings succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadPendings())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_PENDINGS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_PENDINGS_SUCCESS);
      });
  });

  it('dispatches failure action when loadPendings fails', () => {
    const store = mockStore({});

    return store.dispatch(loadPendings({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_PENDINGS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_PENDINGS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadPendingsError', () => {
    const expectedAction = {
      type: CAUSE_MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR,
    };
    expect(dismissLoadPendingsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_PENDINGS_BEGIN correctly', () => {
    const prevState = { loadPendingsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_PENDINGS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPendingsPending).toBe(true);
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_PENDINGS_SUCCESS correctly', () => {
    const prevState = { loadPendingsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_PENDINGS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPendingsPending).toBe(false);
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_PENDINGS_FAILURE correctly', () => {
    const prevState = { loadPendingsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_PENDINGS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPendingsPending).toBe(false);
    expect(state.loadPendingsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR correctly', () => {
    const prevState = { loadPendingsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_PENDINGS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPendingsError).toBe(null);
  });
});

