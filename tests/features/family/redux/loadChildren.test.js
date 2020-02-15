import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  FAMILY_LOAD_CHILDREN_BEGIN,
  FAMILY_LOAD_CHILDREN_SUCCESS,
  FAMILY_LOAD_CHILDREN_FAILURE,
  FAMILY_LOAD_CHILDREN_DISMISS_ERROR,
} from '../../../../src/features/family/redux/constants';

import {
  loadChildren,
  dismissLoadChildrenError,
  reducer,
} from '../../../../src/features/family/redux/loadChildren';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('family/redux/loadChildren', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadChildren succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadChildren())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', FAMILY_LOAD_CHILDREN_BEGIN);
        expect(actions[1]).toHaveProperty('type', FAMILY_LOAD_CHILDREN_SUCCESS);
      });
  });

  it('dispatches failure action when loadChildren fails', () => {
    const store = mockStore({});

    return store.dispatch(loadChildren({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', FAMILY_LOAD_CHILDREN_BEGIN);
        expect(actions[1]).toHaveProperty('type', FAMILY_LOAD_CHILDREN_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadChildrenError', () => {
    const expectedAction = {
      type: FAMILY_LOAD_CHILDREN_DISMISS_ERROR,
    };
    expect(dismissLoadChildrenError()).toEqual(expectedAction);
  });

  it('handles action type FAMILY_LOAD_CHILDREN_BEGIN correctly', () => {
    const prevState = { loadChildrenPending: false };
    const state = reducer(
      prevState,
      { type: FAMILY_LOAD_CHILDREN_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadChildrenPending).toBe(true);
  });

  it('handles action type FAMILY_LOAD_CHILDREN_SUCCESS correctly', () => {
    const prevState = { loadChildrenPending: true };
    const state = reducer(
      prevState,
      { type: FAMILY_LOAD_CHILDREN_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadChildrenPending).toBe(false);
  });

  it('handles action type FAMILY_LOAD_CHILDREN_FAILURE correctly', () => {
    const prevState = { loadChildrenPending: true };
    const state = reducer(
      prevState,
      { type: FAMILY_LOAD_CHILDREN_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadChildrenPending).toBe(false);
    expect(state.loadChildrenError).toEqual(expect.anything());
  });

  it('handles action type FAMILY_LOAD_CHILDREN_DISMISS_ERROR correctly', () => {
    const prevState = { loadChildrenError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: FAMILY_LOAD_CHILDREN_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadChildrenError).toBe(null);
  });
});

