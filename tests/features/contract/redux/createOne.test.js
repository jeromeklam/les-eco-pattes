import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONTRACT_CREATE_ONE_BEGIN,
  CONTRACT_CREATE_ONE_SUCCESS,
  CONTRACT_CREATE_ONE_FAILURE,
  CONTRACT_CREATE_ONE_DISMISS_ERROR,
} from '../../../../src/features/contract/redux/constants';

import {
  createOne,
  dismissCreateOneError,
  reducer,
} from '../../../../src/features/contract/redux/createOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contract/redux/createOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when createOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(createOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_CREATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_CREATE_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when createOne fails', () => {
    const store = mockStore({});

    return store.dispatch(createOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTRACT_CREATE_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTRACT_CREATE_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissCreateOneError', () => {
    const expectedAction = {
      type: CONTRACT_CREATE_ONE_DISMISS_ERROR,
    };
    expect(dismissCreateOneError()).toEqual(expectedAction);
  });

  it('handles action type CONTRACT_CREATE_ONE_BEGIN correctly', () => {
    const prevState = { createOnePending: false };
    const state = reducer(
      prevState,
      { type: CONTRACT_CREATE_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createOnePending).toBe(true);
  });

  it('handles action type CONTRACT_CREATE_ONE_SUCCESS correctly', () => {
    const prevState = { createOnePending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_CREATE_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createOnePending).toBe(false);
  });

  it('handles action type CONTRACT_CREATE_ONE_FAILURE correctly', () => {
    const prevState = { createOnePending: true };
    const state = reducer(
      prevState,
      { type: CONTRACT_CREATE_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createOnePending).toBe(false);
    expect(state.createOneError).toEqual(expect.anything());
  });

  it('handles action type CONTRACT_CREATE_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { createOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTRACT_CREATE_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.createOneError).toBe(null);
  });
});

