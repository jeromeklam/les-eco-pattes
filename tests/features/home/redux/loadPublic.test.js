import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  HOME_LOAD_PUBLIC_BEGIN,
  HOME_LOAD_PUBLIC_SUCCESS,
  HOME_LOAD_PUBLIC_FAILURE,
  HOME_LOAD_PUBLIC_DISMISS_ERROR,
} from '../../../../src/features/home/redux/constants';

import {
  loadPublic,
  dismissLoadPublicError,
  reducer,
} from '../../../../src/features/home/redux/loadPublic';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('home/redux/loadPublic', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadPublic succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadPublic())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_LOAD_PUBLIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_LOAD_PUBLIC_SUCCESS);
      });
  });

  it('dispatches failure action when loadPublic fails', () => {
    const store = mockStore({});

    return store.dispatch(loadPublic({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', HOME_LOAD_PUBLIC_BEGIN);
        expect(actions[1]).toHaveProperty('type', HOME_LOAD_PUBLIC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadPublicError', () => {
    const expectedAction = {
      type: HOME_LOAD_PUBLIC_DISMISS_ERROR,
    };
    expect(dismissLoadPublicError()).toEqual(expectedAction);
  });

  it('handles action type HOME_LOAD_PUBLIC_BEGIN correctly', () => {
    const prevState = { loadPublicPending: false };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_PUBLIC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPublicPending).toBe(true);
  });

  it('handles action type HOME_LOAD_PUBLIC_SUCCESS correctly', () => {
    const prevState = { loadPublicPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_PUBLIC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPublicPending).toBe(false);
  });

  it('handles action type HOME_LOAD_PUBLIC_FAILURE correctly', () => {
    const prevState = { loadPublicPending: true };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_PUBLIC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPublicPending).toBe(false);
    expect(state.loadPublicError).toEqual(expect.anything());
  });

  it('handles action type HOME_LOAD_PUBLIC_DISMISS_ERROR correctly', () => {
    const prevState = { loadPublicError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: HOME_LOAD_PUBLIC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadPublicError).toBe(null);
  });
});

