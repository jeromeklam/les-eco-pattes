import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SITE_PRINT_ONE_BEGIN,
  SITE_PRINT_ONE_SUCCESS,
  SITE_PRINT_ONE_FAILURE,
  SITE_PRINT_ONE_DISMISS_ERROR,
} from '../../../../src/features/site/redux/constants';

import {
  printOne,
  dismissPrintOneError,
  reducer,
} from '../../../../src/features/site/redux/printOne';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('site/redux/printOne', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when printOne succeeds', () => {
    const store = mockStore({});

    return store.dispatch(printOne())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_PRINT_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_PRINT_ONE_SUCCESS);
      });
  });

  it('dispatches failure action when printOne fails', () => {
    const store = mockStore({});

    return store.dispatch(printOne({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SITE_PRINT_ONE_BEGIN);
        expect(actions[1]).toHaveProperty('type', SITE_PRINT_ONE_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissPrintOneError', () => {
    const expectedAction = {
      type: SITE_PRINT_ONE_DISMISS_ERROR,
    };
    expect(dismissPrintOneError()).toEqual(expectedAction);
  });

  it('handles action type SITE_PRINT_ONE_BEGIN correctly', () => {
    const prevState = { printOnePending: false };
    const state = reducer(
      prevState,
      { type: SITE_PRINT_ONE_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.printOnePending).toBe(true);
  });

  it('handles action type SITE_PRINT_ONE_SUCCESS correctly', () => {
    const prevState = { printOnePending: true };
    const state = reducer(
      prevState,
      { type: SITE_PRINT_ONE_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.printOnePending).toBe(false);
  });

  it('handles action type SITE_PRINT_ONE_FAILURE correctly', () => {
    const prevState = { printOnePending: true };
    const state = reducer(
      prevState,
      { type: SITE_PRINT_ONE_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.printOnePending).toBe(false);
    expect(state.printOneError).toEqual(expect.anything());
  });

  it('handles action type SITE_PRINT_ONE_DISMISS_ERROR correctly', () => {
    const prevState = { printOneError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SITE_PRINT_ONE_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.printOneError).toBe(null);
  });
});

