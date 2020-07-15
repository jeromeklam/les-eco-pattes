import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENT_LOAD_CLI_SPEC_BEGIN,
  CLIENT_LOAD_CLI_SPEC_SUCCESS,
  CLIENT_LOAD_CLI_SPEC_FAILURE,
  CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR,
} from '../../../../src/features/client/redux/constants';

import {
  loadCliSpec,
  dismissLoadCliSpecError,
  reducer,
} from '../../../../src/features/client/redux/loadCliSpec';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('client/redux/loadCliSpec', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadCliSpec succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadCliSpec())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_LOAD_CLI_SPEC_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_LOAD_CLI_SPEC_SUCCESS);
      });
  });

  it('dispatches failure action when loadCliSpec fails', () => {
    const store = mockStore({});

    return store.dispatch(loadCliSpec({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_LOAD_CLI_SPEC_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_LOAD_CLI_SPEC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadCliSpecError', () => {
    const expectedAction = {
      type: CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR,
    };
    expect(dismissLoadCliSpecError()).toEqual(expectedAction);
  });

  it('handles action type CLIENT_LOAD_CLI_SPEC_BEGIN correctly', () => {
    const prevState = { loadCliSpecPending: false };
    const state = reducer(
      prevState,
      { type: CLIENT_LOAD_CLI_SPEC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCliSpecPending).toBe(true);
  });

  it('handles action type CLIENT_LOAD_CLI_SPEC_SUCCESS correctly', () => {
    const prevState = { loadCliSpecPending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_LOAD_CLI_SPEC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCliSpecPending).toBe(false);
  });

  it('handles action type CLIENT_LOAD_CLI_SPEC_FAILURE correctly', () => {
    const prevState = { loadCliSpecPending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_LOAD_CLI_SPEC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCliSpecPending).toBe(false);
    expect(state.loadCliSpecError).toEqual(expect.anything());
  });

  it('handles action type CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR correctly', () => {
    const prevState = { loadCliSpecError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadCliSpecError).toBe(null);
  });
});

