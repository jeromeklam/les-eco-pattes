import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONTRACT_DEL_CONTRACT_MEDIA_BEGIN,
  CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS,
  CONTRACT_DEL_CONTRACT_MEDIA_FAILURE,
  CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR,
} from '../../../../src/features/contract/redux/constants';

import {
  delContractMedia,
  dismissDelContractMediaError,
  reducer,
} from '../../../../src/features/contract/redux/delContractMedia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contract/redux/delContractMedia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when delContractMedia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(delContractMedia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_DEL_CONTRACT_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS);
      });
  });

  it('dispatches failure action when delContractMedia fails', () => {
    const store = mockStore({});

    return store.dispatch(delContractMedia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_DEL_CONTRACT_MEDIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_DEL_CONTRACT_MEDIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissDelContractMediaError', () => {
    const expectedAction = {
      type: CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR,
    };
    expect(dismissDelContractMediaError()).toEqual(expectedAction);
  });

  it('handles action type CONTRACT_DEL_CONTRACT_MEDIA_BEGIN correctly', () => {
    const prevState = { delContractMediaPending: false };
    const state = reducer(
      prevState,
      { type: CONTRACT_DEL_CONTRACT_MEDIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delContractMediaPending).toBe(true);
  });

  it('handles action type CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS correctly', () => {
    const prevState = { delContractMediaPending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_DEL_CONTRACT_MEDIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delContractMediaPending).toBe(false);
  });

  it('handles action type CONTRACT_DEL_CONTRACT_MEDIA_FAILURE correctly', () => {
    const prevState = { delContractMediaPending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_DEL_CONTRACT_MEDIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delContractMediaPending).toBe(false);
    expect(state.delContractMediaError).toEqual(expect.anything());
  });

  it('handles action type CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR correctly', () => {
    const prevState = { delContractMediaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRACT_DEL_CONTRACT_MEDIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.delContractMediaError).toBe(null);
  });
});

