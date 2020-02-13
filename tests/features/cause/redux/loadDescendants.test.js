import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_LOAD_DESCENDANTS_BEGIN,
  CAUSE_LOAD_DESCENDANTS_SUCCESS,
  CAUSE_LOAD_DESCENDANTS_FAILURE,
  CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  loadDescendants,
  dismissLoadDescendantsError,
  reducer,
} from '../../../../src/features/cause/redux/loadDescendants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/loadDescendants', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadDescendants succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadDescendants())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_DESCENDANTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_DESCENDANTS_SUCCESS);
      });
  });

  it('dispatches failure action when loadDescendants fails', () => {
    const store = mockStore({});

    return store.dispatch(loadDescendants({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_DESCENDANTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_DESCENDANTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadDescendantsError', () => {
    const expectedAction = {
      type: CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR,
    };
    expect(dismissLoadDescendantsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_LOAD_DESCENDANTS_BEGIN correctly', () => {
    const prevState = { loadDescendantsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DESCENDANTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDescendantsPending).toBe(true);
  });

  it('handles action type CAUSE_LOAD_DESCENDANTS_SUCCESS correctly', () => {
    const prevState = { loadDescendantsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DESCENDANTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDescendantsPending).toBe(false);
  });

  it('handles action type CAUSE_LOAD_DESCENDANTS_FAILURE correctly', () => {
    const prevState = { loadDescendantsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DESCENDANTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDescendantsPending).toBe(false);
    expect(state.loadDescendantsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR correctly', () => {
    const prevState = { loadDescendantsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DESCENDANTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDescendantsError).toBe(null);
  });
});

