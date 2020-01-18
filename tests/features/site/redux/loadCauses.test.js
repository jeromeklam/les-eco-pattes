import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SITE_LOAD_CAUSES_BEGIN,
  SITE_LOAD_CAUSES_SUCCESS,
  SITE_LOAD_CAUSES_FAILURE,
  SITE_LOAD_CAUSES_DISMISS_ERROR,
} from '../../../../src/features/site/redux/constants';

import {
  loadCauses,
  dismissLoadCausesError,
  reducer,
} from '../../../../src/features/site/redux/loadCauses';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('site/redux/loadCauses', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadCauses succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadCauses())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_LOAD_CAUSES_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_LOAD_CAUSES_SUCCESS);
      });
  });

  it('dispatches failure action when loadCauses fails', () => {
    const store = mockStore({});

    return store.dispatch(loadCauses({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_LOAD_CAUSES_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_LOAD_CAUSES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadCausesError', () => {
    const expectedAction = {
      type: SITE_LOAD_CAUSES_DISMISS_ERROR,
    };
    expect(dismissLoadCausesError()).toEqual(expectedAction);
  });

  it('handles action type SITE_LOAD_CAUSES_BEGIN correctly', () => {
    const prevState = { loadCausesPending: false };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_CAUSES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCausesPending).toBe(true);
  });

  it('handles action type SITE_LOAD_CAUSES_SUCCESS correctly', () => {
    const prevState = { loadCausesPending: true };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_CAUSES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCausesPending).toBe(false);
  });

  it('handles action type SITE_LOAD_CAUSES_FAILURE correctly', () => {
    const prevState = { loadCausesPending: true };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_CAUSES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCausesPending).toBe(false);
    expect(state.loadCausesError).toEqual(expect.anything());
  });

  it('handles action type SITE_LOAD_CAUSES_DISMISS_ERROR correctly', () => {
    const prevState = { loadCausesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_CAUSES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCausesError).toBe(null);
  });
});

