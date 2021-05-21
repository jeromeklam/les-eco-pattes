import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN,
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS,
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE,
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR,
} from '../../../../src/features/contract/redux/constants';

import {
  updateContractMediaDesc,
  dismissUpdateContractMediaDescError,
  reducer,
} from '../../../../src/features/contract/redux/updateContractMediaDesc';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contract/redux/updateContractMediaDesc', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when updateContractMediaDesc succeeds', () => {
    const store = mockStore({});

    return store.dispatch(updateContractMediaDesc())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS);
      });
  });

  it('dispatches failure action when updateContractMediaDesc fails', () => {
    const store = mockStore({});

    return store.dispatch(updateContractMediaDesc({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissUpdateContractMediaDescError', () => {
    const expectedAction = {
      type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR,
    };
    expect(dismissUpdateContractMediaDescError()).toEqual(expectedAction);
  });

  it('handles action type CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN correctly', () => {
    const prevState = { updateContractMediaDescPending: false };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateContractMediaDescPending).toBe(true);
  });

  it('handles action type CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS correctly', () => {
    const prevState = { updateContractMediaDescPending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateContractMediaDescPending).toBe(false);
  });

  it('handles action type CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE correctly', () => {
    const prevState = { updateContractMediaDescPending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateContractMediaDescPending).toBe(false);
    expect(state.updateContractMediaDescError).toEqual(expect.anything());
  });

  it('handles action type CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR correctly', () => {
    const prevState = { updateContractMediaDescError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.updateContractMediaDescError).toBe(null);
  });
});

