import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SITE_LOAD_PHOTOS_BEGIN,
  SITE_LOAD_PHOTOS_SUCCESS,
  SITE_LOAD_PHOTOS_FAILURE,
  SITE_LOAD_PHOTOS_DISMISS_ERROR,
} from '../../../../src/features/site/redux/constants';

import {
  loadPhotos,
  dismissLoadPhotosError,
  reducer,
} from '../../../../src/features/site/redux/loadPhotos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('site/redux/loadPhotos', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadPhotos succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadPhotos())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_LOAD_PHOTOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_LOAD_PHOTOS_SUCCESS);
      });
  });

  it('dispatches failure action when loadPhotos fails', () => {
    const store = mockStore({});

    return store.dispatch(loadPhotos({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_LOAD_PHOTOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_LOAD_PHOTOS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadPhotosError', () => {
    const expectedAction = {
      type: SITE_LOAD_PHOTOS_DISMISS_ERROR,
    };
    expect(dismissLoadPhotosError()).toEqual(expectedAction);
  });

  it('handles action type SITE_LOAD_PHOTOS_BEGIN correctly', () => {
    const prevState = { loadPhotosPending: false };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_PHOTOS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosPending).toBe(true);
  });

  it('handles action type SITE_LOAD_PHOTOS_SUCCESS correctly', () => {
    const prevState = { loadPhotosPending: true };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_PHOTOS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosPending).toBe(false);
  });

  it('handles action type SITE_LOAD_PHOTOS_FAILURE correctly', () => {
    const prevState = { loadPhotosPending: true };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_PHOTOS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosPending).toBe(false);
    expect(state.loadPhotosError).toEqual(expect.anything());
  });

  it('handles action type SITE_LOAD_PHOTOS_DISMISS_ERROR correctly', () => {
    const prevState = { loadPhotosError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SITE_LOAD_PHOTOS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosError).toBe(null);
  });
});

