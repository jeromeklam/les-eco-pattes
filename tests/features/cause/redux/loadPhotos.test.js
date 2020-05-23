import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_LOAD_PHOTOS_BEGIN,
  CAUSE_LOAD_PHOTOS_SUCCESS,
  CAUSE_LOAD_PHOTOS_FAILURE,
  CAUSE_LOAD_PHOTOS_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  loadPhotos,
  dismissLoadPhotosError,
  reducer,
} from '../../../../src/features/cause/redux/loadPhotos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/loadPhotos', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadPhotos succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadPhotos())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_PHOTOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_PHOTOS_SUCCESS);
      });
  });

  it('dispatches failure action when loadPhotos fails', () => {
    const store = mockStore({});

    return store.dispatch(loadPhotos({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_LOAD_PHOTOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_LOAD_PHOTOS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadPhotosError', () => {
    const expectedAction = {
      type: CAUSE_LOAD_PHOTOS_DISMISS_ERROR,
    };
    expect(dismissLoadPhotosError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_LOAD_PHOTOS_BEGIN correctly', () => {
    const prevState = { loadPhotosPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_PHOTOS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosPending).toBe(true);
  });

  it('handles action type CAUSE_LOAD_PHOTOS_SUCCESS correctly', () => {
    const prevState = { loadPhotosPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_PHOTOS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosPending).toBe(false);
  });

  it('handles action type CAUSE_LOAD_PHOTOS_FAILURE correctly', () => {
    const prevState = { loadPhotosPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_PHOTOS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosPending).toBe(false);
    expect(state.loadPhotosError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_LOAD_PHOTOS_DISMISS_ERROR correctly', () => {
    const prevState = { loadPhotosError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_LOAD_PHOTOS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPhotosError).toBe(null);
  });
});

