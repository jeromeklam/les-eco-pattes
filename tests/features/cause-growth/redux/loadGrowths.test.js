import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_GROWTH_LOAD_GROWTHS_BEGIN,
  CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS,
  CAUSE_GROWTH_LOAD_GROWTHS_FAILURE,
  CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR,
} from '../../../../src/features/cause-growth/redux/constants';

import {
  loadGrowths,
  dismissLoadGrowthsError,
  reducer,
} from '../../../../src/features/cause-growth/redux/loadGrowths';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause-growth/redux/loadGrowths', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadGrowths succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadGrowths())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_GROWTH_LOAD_GROWTHS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS);
      });
  });

  it('dispatches failure action when loadGrowths fails', () => {
    const store = mockStore({});

    return store.dispatch(loadGrowths({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_GROWTH_LOAD_GROWTHS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_GROWTH_LOAD_GROWTHS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadGrowthsError', () => {
    const expectedAction = {
      type: CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR,
    };
    expect(dismissLoadGrowthsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_GROWTH_LOAD_GROWTHS_BEGIN correctly', () => {
    const prevState = { loadGrowthsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_GROWTH_LOAD_GROWTHS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadGrowthsPending).toBe(true);
  });

  it('handles action type CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS correctly', () => {
    const prevState = { loadGrowthsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_GROWTH_LOAD_GROWTHS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadGrowthsPending).toBe(false);
  });

  it('handles action type CAUSE_GROWTH_LOAD_GROWTHS_FAILURE correctly', () => {
    const prevState = { loadGrowthsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_GROWTH_LOAD_GROWTHS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadGrowthsPending).toBe(false);
    expect(state.loadGrowthsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR correctly', () => {
    const prevState = { loadGrowthsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_GROWTH_LOAD_GROWTHS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadGrowthsError).toBe(null);
  });
});

