import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CLIENT_EXPORT_AS_TAB_BEGIN,
  CLIENT_EXPORT_AS_TAB_SUCCESS,
  CLIENT_EXPORT_AS_TAB_FAILURE,
  CLIENT_EXPORT_AS_TAB_DISMISS_ERROR,
} from '../../../../src/features/client/redux/constants';

import {
  exportAsTab,
  dismissExportAsTabError,
  reducer,
} from '../../../../src/features/client/redux/exportAsTab';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('client/redux/exportAsTab', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when exportAsTab succeeds', () => {
    const store = mockStore({});

    return store.dispatch(exportAsTab())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_EXPORT_AS_TAB_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_EXPORT_AS_TAB_SUCCESS);
      });
  });

  it('dispatches failure action when exportAsTab fails', () => {
    const store = mockStore({});

    return store.dispatch(exportAsTab({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CLIENT_EXPORT_AS_TAB_BEGIN);
        expect(actions[1]).toHaveProperty('type', CLIENT_EXPORT_AS_TAB_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissExportAsTabError', () => {
    const expectedAction = {
      type: CLIENT_EXPORT_AS_TAB_DISMISS_ERROR,
    };
    expect(dismissExportAsTabError()).toEqual(expectedAction);
  });

  it('handles action type CLIENT_EXPORT_AS_TAB_BEGIN correctly', () => {
    const prevState = { exportAsTabPending: false };
    const state = reducer(
      prevState,
      { type: CLIENT_EXPORT_AS_TAB_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exportAsTabPending).toBe(true);
  });

  it('handles action type CLIENT_EXPORT_AS_TAB_SUCCESS correctly', () => {
    const prevState = { exportAsTabPending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_EXPORT_AS_TAB_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exportAsTabPending).toBe(false);
  });

  it('handles action type CLIENT_EXPORT_AS_TAB_FAILURE correctly', () => {
    const prevState = { exportAsTabPending: true };
    const state = reducer(
      prevState,
      { type: CLIENT_EXPORT_AS_TAB_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exportAsTabPending).toBe(false);
    expect(state.exportAsTabError).toEqual(expect.anything());
  });

  it('handles action type CLIENT_EXPORT_AS_TAB_DISMISS_ERROR correctly', () => {
    const prevState = { exportAsTabError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CLIENT_EXPORT_AS_TAB_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.exportAsTabError).toBe(null);
  });
});

