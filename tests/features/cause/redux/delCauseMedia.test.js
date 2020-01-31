import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_DEL_CAUSE_MEDIA_BEGIN,
  CAUSE_DEL_CAUSE_MEDIA_SUCCESS,
  CAUSE_DEL_CAUSE_MEDIA_FAILURE,
  CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/cause/redux/constants';

import {
  delCauseMedia,
  dismissDelCauseMediaError,
  reducer,
} from '../../../../src/features/cause/redux/delCauseMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause/redux/delCauseMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when delCauseMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(delCauseMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_DEL_CAUSE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_DEL_CAUSE_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when delCauseMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(delCauseMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_DEL_CAUSE_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_DEL_CAUSE_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDelCauseMediaError', () => {
    const expectedAction = {
      type: CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR,
    };
    expect(dismissDelCauseMediaError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_DEL_CAUSE_MEDIA_BEGIN correctly', () => {
    const prevState = { delCauseMediaPending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_DEL_CAUSE_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delCauseMediaPending).toBe(true);
  });

  it('handles action type CAUSE_DEL_CAUSE_MEDIA_SUCCESS correctly', () => {
    const prevState = { delCauseMediaPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_DEL_CAUSE_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delCauseMediaPending).toBe(false);
  });

  it('handles action type CAUSE_DEL_CAUSE_MEDIA_FAILURE correctly', () => {
    const prevState = { delCauseMediaPending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_DEL_CAUSE_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delCauseMediaPending).toBe(false);
    expect(state.delCauseMediaError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { delCauseMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_DEL_CAUSE_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delCauseMediaError).toBe(null);
  });
});

