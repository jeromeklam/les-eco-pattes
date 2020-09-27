import { getNewNormalizedObject } from 'jsonapi-tools';

const initialState = {
  emptyItem: null,
  items: getNewNormalizedObject('FreeAsso_CauseMovement'),
  cause: null,
  pendings: [],
  loadOneItem: null,
  loadOnePending: false,
  loadOneError: null,
  loadMovementsPending: false,
  loadMovementsError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  validateOnePending: false,
  validateOneError: null,
  loadPendingsPending: false,
  loadPendingsError: null,
};

export default initialState;
