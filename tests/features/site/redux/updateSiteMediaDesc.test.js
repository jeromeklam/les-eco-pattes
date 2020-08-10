import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SITE_UPDATE_SITE_MEDIA_DESC_BEGIN,
  SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS,
  SITE_UPDATE_SITE_MEDIA_DESC_FAILURE,
  SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR,
} from '../../../../src/features/site/redux/constants';

import {
  updateSiteMediaDesc,
  dismissUpdateSiteMediaDescError,
  reducer,
} from '../../../../src/features/site/redux/updateSiteMediaDesc';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('site/redux/updateSiteMediaDesc', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateSiteMediaDesc succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateSiteMediaDesc())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_UPDATE_SITE_MEDIA_DESC_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS);
      });
  });

  it('dispatches failure action when updateSiteMediaDesc fails', () => {
    const store = mockStore({});

    return store.dispatch(updateSiteMediaDesc({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_UPDATE_SITE_MEDIA_DESC_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_UPDATE_SITE_MEDIA_DESC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateSiteMediaDescError', () => {
    const expectedAction = {
      type: SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR,
    };
    expect(dismissUpdateSiteMediaDescError()).toEqual(expectedAction);
  });

  it('handles action type SITE_UPDATE_SITE_MEDIA_DESC_BEGIN correctly', () => {
    const prevState = { updateSiteMediaDescPending: false };
    const state = reducer(
      prevState,
      { type: SITE_UPDATE_SITE_MEDIA_DESC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateSiteMediaDescPending).toBe(true);
  });

  it('handles action type SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS correctly', () => {
    const prevState = { updateSiteMediaDescPending: true };
    const state = reducer(
      prevState,
      { type: SITE_UPDATE_SITE_MEDIA_DESC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateSiteMediaDescPending).toBe(false);
  });

  it('handles action type SITE_UPDATE_SITE_MEDIA_DESC_FAILURE correctly', () => {
    const prevState = { updateSiteMediaDescPending: true };
    const state = reducer(
      prevState,
      { type: SITE_UPDATE_SITE_MEDIA_DESC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateSiteMediaDescPending).toBe(false);
    expect(state.updateSiteMediaDescError).toEqual(expect.anything());
  });

  it('handles action type SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR correctly', () => {
    const prevState = { updateSiteMediaDescError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SITE_UPDATE_SITE_MEDIA_DESC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateSiteMediaDescError).toBe(null);
  });
});

