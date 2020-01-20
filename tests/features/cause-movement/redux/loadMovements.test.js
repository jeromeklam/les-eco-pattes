import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN,
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS,
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE,
  CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR,
} from '../../../../src/features/cause-movement/redux/constants';

import {
  loadMovements,
  dismissLoadMovementsError,
  reducer,
} from '../../../../src/features/cause-movement/redux/loadMovements';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause-movement/redux/loadMovements', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadMovements succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadMovements())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS);
      });
  });

  it('dispatches failure action when loadMovements fails', () => {
    const store = mockStore({});

    return store.dispatch(loadMovements({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadMovementsError', () => {
    const expectedAction = {
      type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR,
    };
    expect(dismissLoadMovementsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN correctly', () => {
    const prevState = { loadMovementsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMovementsPending).toBe(true);
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS correctly', () => {
    const prevState = { loadMovementsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMovementsPending).toBe(false);
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE correctly', () => {
    const prevState = { loadMovementsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMovementsPending).toBe(false);
    expect(state.loadMovementsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR correctly', () => {
    const prevState = { loadMovementsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_MOVEMENT_LOAD_MOVEMENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadMovementsError).toBe(null);
  });
});

