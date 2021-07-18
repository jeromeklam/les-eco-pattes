import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  INBOX_DOWNLOAD_ONE_BEGIN,
  INBOX_DOWNLOAD_ONE_SUCCESS,
  INBOX_DOWNLOAD_ONE_FAILURE,
  INBOX_DOWNLOAD_ONE_DISMISS_ERROR,
} from '../../../../src/features/inbox/redux/constants';

import {
  downloadOne,
  dismissDownloadOneError,
  reducer,
} from '../../../../src/features/inbox/redux/downloadOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('inbox/redux/downloadOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when downloadOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(downloadOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', INBOX_DOWNLOAD_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', INBOX_DOWNLOAD_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when downloadOne fails', () => {
    const store = mockStore({});

    return store.dispatch(downloadOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', INBOX_DOWNLOAD_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', INBOX_DOWNLOAD_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDownloadOneError', () => {
    const expectedAction = {
      type: INBOX_DOWNLOAD_ONE_DISMISS_ERROR,
    };
    expect(dismissDownloadOneError()).toEqual(expectedAction);
  });

  it('handles action type INBOX_DOWNLOAD_ONE_BEGIN correctly', () => {
    const prevState = { downloadOnePending: false };
    const state = reducer(
      prevState,
      { type: INBOX_DOWNLOAD_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.downloadOnePending).toBe(true);
  });

  it('handles action type INBOX_DOWNLOAD_ONE_SUCCESS correctly', () => {
    const prevState = { downloadOnePending: true };
    const state = reducer(
      prevState,
      { type: INBOX_DOWNLOAD_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.downloadOnePending).toBe(false);
  });

  it('handles action type INBOX_DOWNLOAD_ONE_FAILURE correctly', () => {
    const prevState = { downloadOnePending: true };
    const state = reducer(
      prevState,
      { type: INBOX_DOWNLOAD_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.downloadOnePending).toBe(false);
    expect(state.downloadOneError).toEqual(expect.anything());
  });

  it('handles action type INBOX_DOWNLOAD_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { downloadOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: INBOX_DOWNLOAD_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.downloadOneError).toBe(null);
  });
});

