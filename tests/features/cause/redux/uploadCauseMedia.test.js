import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN,
  CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS,
  CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE,
  CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  uploadCauseMedia,
  dismissUploadCauseMediaError,
  reducer,
} from '../../../../src/features/cause/redux/uploadCauseMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/uploadCauseMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when uploadCauseMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(uploadCauseMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when uploadCauseMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(uploadCauseMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUploadCauseMediaError', () => {
    const expectedAction = {
      type: CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR,
    };
    expect(dismissUploadCauseMediaError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN correctly', () => {
    const prevState = { uploadCauseMediaPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_CAUSE_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadCauseMediaPending).toBe(true);
  });

  it('handles action type CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS correctly', () => {
    const prevState = { uploadCauseMediaPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_CAUSE_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadCauseMediaPending).toBe(false);
  });

  it('handles action type CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE correctly', () => {
    const prevState = { uploadCauseMediaPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_CAUSE_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadCauseMediaPending).toBe(false);
    expect(state.uploadCauseMediaError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { uploadCauseMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_UPLOAD_CAUSE_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.uploadCauseMediaError).toBe(null);
  });
});

