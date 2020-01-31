import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_LOAD_DOCUMENTS_BEGIN,
  CAUSE_LOAD_DOCUMENTS_SUCCESS,
  CAUSE_LOAD_DOCUMENTS_FAILURE,
  CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  loadDocuments,
  dismissLoadDocumentsError,
  reducer,
} from '../../../../src/features/cause/redux/loadDocuments';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/loadDocuments', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadDocuments succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadDocuments())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_DOCUMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_DOCUMENTS_SUCCESS);
      });
  });

  it('dispatches failure action when loadDocuments fails', () => {
    const store = mockStore({});

    return store.dispatch(loadDocuments({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_DOCUMENTS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_DOCUMENTS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadDocumentsError', () => {
    const expectedAction = {
      type: CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR,
    };
    expect(dismissLoadDocumentsError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_LOAD_DOCUMENTS_BEGIN correctly', () => {
    const prevState = { loadDocumentsPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DOCUMENTS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDocumentsPending).toBe(true);
  });

  it('handles action type CAUSE_LOAD_DOCUMENTS_SUCCESS correctly', () => {
    const prevState = { loadDocumentsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DOCUMENTS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDocumentsPending).toBe(false);
  });

  it('handles action type CAUSE_LOAD_DOCUMENTS_FAILURE correctly', () => {
    const prevState = { loadDocumentsPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DOCUMENTS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDocumentsPending).toBe(false);
    expect(state.loadDocumentsError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR correctly', () => {
    const prevState = { loadDocumentsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_DOCUMENTS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadDocumentsError).toBe(null);
  });
});

