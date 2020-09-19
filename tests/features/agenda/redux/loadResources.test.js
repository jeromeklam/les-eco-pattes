import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  AGENDA_LOAD_RESOURCES_BEGIN,
  AGENDA_LOAD_RESOURCES_SUCCESS,
  AGENDA_LOAD_RESOURCES_FAILURE,
  AGENDA_LOAD_RESOURCES_DISMISS_ERROR,
} from '../../../../src/features/agenda/redux/constants';

import {
  loadResources,
  dismissLoadResourcesError,
  reducer,
} from '../../../../src/features/agenda/redux/loadResources';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('agenda/redux/loadResources', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when loadResources succeeds', () => {
    const store = mockStore({});

    return store.dispatch(loadResources())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AGENDA_LOAD_RESOURCES_BEGIN);
        expect(actions[1]).toHaveProperty('type', AGENDA_LOAD_RESOURCES_SUCCESS);
      });
  });

  it('dispatches failure action when loadResources fails', () => {
    const store = mockStore({});

    return store.dispatch(loadResources({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', AGENDA_LOAD_RESOURCES_BEGIN);
        expect(actions[1]).toHaveProperty('type', AGENDA_LOAD_RESOURCES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissLoadResourcesError', () => {
    const expectedAction = {
      type: AGENDA_LOAD_RESOURCES_DISMISS_ERROR,
    };
    expect(dismissLoadResourcesError()).toEqual(expectedAction);
  });

  it('handles action type AGENDA_LOAD_RESOURCES_BEGIN correctly', () => {
    const prevState = { loadResourcesPending: false };
    const state = reducer(
      prevState,
      { type: AGENDA_LOAD_RESOURCES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadResourcesPending).toBe(true);
  });

  it('handles action type AGENDA_LOAD_RESOURCES_SUCCESS correctly', () => {
    const prevState = { loadResourcesPending: true };
    const state = reducer(
      prevState,
      { type: AGENDA_LOAD_RESOURCES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadResourcesPending).toBe(false);
  });

  it('handles action type AGENDA_LOAD_RESOURCES_FAILURE correctly', () => {
    const prevState = { loadResourcesPending: true };
    const state = reducer(
      prevState,
      { type: AGENDA_LOAD_RESOURCES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadResourcesPending).toBe(false);
    expect(state.loadResourcesError).toEqual(expect.anything());
  });

  it('handles action type AGENDA_LOAD_RESOURCES_DISMISS_ERROR correctly', () => {
    const prevState = { loadResourcesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: AGENDA_LOAD_RESOURCES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.loadResourcesError).toBe(null);
  });
});

