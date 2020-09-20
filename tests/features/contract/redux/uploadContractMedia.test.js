import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN,
  CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS,
  CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE,
  CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/contract/redux/constants';

import {
  uploadContractMedia,
  dismissUploadContractMediaError,
  reducer,
} from '../../../../src/features/contract/redux/uploadContractMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contract/redux/uploadContractMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when uploadContractMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(uploadContractMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when uploadContractMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(uploadContractMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUploadContractMediaError', () => {
    const expectedAction = {
      type: CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR,
    };
    expect(dismissUploadContractMediaError()).toEqual(expectedAction);
  });

  it('handles action type CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN correctly', () => {
    const prevState = { uploadContractMediaPending: false };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPLOAD_CONTRACT_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadContractMediaPending).toBe(true);
  });

  it('handles action type CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS correctly', () => {
    const prevState = { uploadContractMediaPending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPLOAD_CONTRACT_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadContractMediaPending).toBe(false);
  });

  it('handles action type CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE correctly', () => {
    const prevState = { uploadContractMediaPending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPLOAD_CONTRACT_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadContractMediaPending).toBe(false);
    expect(state.uploadContractMediaError).toEqual(expect.anything());
  });

  it('handles action type CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { uploadContractMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPLOAD_CONTRACT_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadContractMediaError).toBe(null);
  });
});

