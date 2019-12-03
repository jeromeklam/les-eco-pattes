import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CAUSE_MAIN_TYPE_DEL_ONE_BEGIN,
  CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS,
  CAUSE_MAIN_TYPE_DEL_ONE_FAILURE,
  CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR,
} from '../../../../src/features/cause-main-type/redux/constants';

import {
  delOne,
  dismissDelOneError,
  reducer,
} from '../../../../src/features/cause-main-type/redux/delOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cause-main-type/redux/delOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when delOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(delOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MAIN_TYPE_DEL_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when delOne fails', () => {
    const store = mockStore({});

    return store.dispatch(delOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CAUSE_MAIN_TYPE_DEL_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CAUSE_MAIN_TYPE_DEL_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDelOneError', () => {
    const expectedAction = {
      type: CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR,
    };
    expect(dismissDelOneError()).toEqual(expectedAction);
  });

  it('handles action type CAUSE_MAIN_TYPE_DEL_ONE_BEGIN correctly', () => {
    const prevState = { deleteOnePending: false };
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_DEL_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteOnePending).toBe(true);
  });

  it('handles action type CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS correctly', () => {
    const prevState = { deleteOnePending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_DEL_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteOnePending).toBe(false);
  });

  it('handles action type CAUSE_MAIN_TYPE_DEL_ONE_FAILURE correctly', () => {
    const prevState = { deleteOnePending: true };
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_DEL_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteOnePending).toBe(false);
    expect(state.deleteOneError).toEqual(expect.anything());
  });

  it('handles action type CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { deleteOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CAUSE_MAIN_TYPE_DEL_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.deleteOneError).toBe(null);
  });
});

