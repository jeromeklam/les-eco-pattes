import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SITE_DEL_ONE_BEGIN,
  SITE_DEL_ONE_SUCCESS,
  SITE_DEL_ONE_FAILURE,
  SITE_DEL_ONE_DISMISS_ERROR,
} from '../../../../src/features/site/redux/constants';

import {
  delOne,
  dismissDelOneError,
  reducer,
} from '../../../../src/features/site/redux/delOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('site/redux/delOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when delOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(delOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_DEL_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_DEL_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when delOne fails', () => {
    const store = mockStore({});

    return store.dispatch(delOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_DEL_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_DEL_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDelOneError', () => {
    const expectedAction = {
      type: SITE_DEL_ONE_DISMISS_ERROR,
    };
    expect(dismissDelOneError()).toEqual(expectedAction);
  });

  it('handles action type SITE_DEL_ONE_BEGIN correctly', () => {
    const prevState = { delOnePending: false };
    const state = reducer(
      prevState,
      { type: SITE_DEL_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delOnePending).toBe(true);
  });

  it('handles action type SITE_DEL_ONE_SUCCESS correctly', () => {
    const prevState = { delOnePending: true };
    const state = reducer(
      prevState,
      { type: SITE_DEL_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delOnePending).toBe(false);
  });

  it('handles action type SITE_DEL_ONE_FAILURE correctly', () => {
    const prevState = { delOnePending: true };
    const state = reducer(
      prevState,
      { type: SITE_DEL_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delOnePending).toBe(false);
    expect(state.delOneError).toEqual(expect.anything());
  });

  it('handles action type SITE_DEL_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { delOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SITE_DEL_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delOneError).toBe(null);
  });
});

