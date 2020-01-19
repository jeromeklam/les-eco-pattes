import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SITE_DEL_SITE_MEDIA_BEGIN,
  SITE_DEL_SITE_MEDIA_SUCCESS,
  SITE_DEL_SITE_MEDIA_FAILURE,
  SITE_DEL_SITE_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/site/redux/constants';

import {
  delSiteMedia,
  dismissDelSiteMediaError,
  reducer,
} from '../../../../src/features/site/redux/delSiteMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('site/redux/delSiteMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when delSiteMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(delSiteMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_DEL_SITE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_DEL_SITE_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when delSiteMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(delSiteMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_DEL_SITE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_DEL_SITE_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDelSiteMediaError', () => {
    const expectedAction = {
      type: SITE_DEL_SITE_MEDIA_DISMISS_ERROR,
    };
    expect(dismissDelSiteMediaError()).toEqual(expectedAction);
  });

  it('handles action type SITE_DEL_SITE_MEDIA_BEGIN correctly', () => {
    const prevState = { delSiteMediaPending: false };
    const state = reducer(
      prevState,
      { type: SITE_DEL_SITE_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delSiteMediaPending).toBe(true);
  });

  it('handles action type SITE_DEL_SITE_MEDIA_SUCCESS correctly', () => {
    const prevState = { delSiteMediaPending: true };
    const state = reducer(
      prevState,
      { type: SITE_DEL_SITE_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delSiteMediaPending).toBe(false);
  });

  it('handles action type SITE_DEL_SITE_MEDIA_FAILURE correctly', () => {
    const prevState = { delSiteMediaPending: true };
    const state = reducer(
      prevState,
      { type: SITE_DEL_SITE_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delSiteMediaPending).toBe(false);
    expect(state.delSiteMediaError).toEqual(expect.anything());
  });

  it('handles action type SITE_DEL_SITE_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { delSiteMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SITE_DEL_SITE_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delSiteMediaError).toBe(null);
  });
});

