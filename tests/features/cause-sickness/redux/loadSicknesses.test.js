import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN,
  CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS,
  CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE,
  CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR,
} from '../../../../src/features/cause-sickness/redux/constants';

import {
  loadSicknesses,
  dismissLoadSicknessesError,
  reducer,
} from '../../../../src/features/cause-sickness/redux/loadSicknesses';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause-sickness/redux/loadSicknesses', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadSicknesses succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadSicknesses())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS);
      });
  });

  it('dispatches failure action when loadSicknesses fails', () => {
    const store = mockStore({});

    return store.dispatch(loadSicknesses({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadSicknessesError', () => {
    const expectedAction = {
      type: CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR,
    };
    expect(dismissLoadSicknessesError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN correctly', () => {
    const prevState = { loasSicknessesPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_SICKNESS_LOAD_SICKNESSES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loasSicknessesPending).toBe(true);
  });

  it('handles action type CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS correctly', () => {
    const prevState = { loasSicknessesPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_SICKNESS_LOAD_SICKNESSES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loasSicknessesPending).toBe(false);
  });

  it('handles action type CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE correctly', () => {
    const prevState = { loasSicknessesPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_SICKNESS_LOAD_SICKNESSES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loasSicknessesPending).toBe(false);
    expect(state.loasSicknessesError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR correctly', () => {
    const prevState = { loasSicknessesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_SICKNESS_LOAD_SICKNESSES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loasSicknessesError).toBe(null);
  });
});

