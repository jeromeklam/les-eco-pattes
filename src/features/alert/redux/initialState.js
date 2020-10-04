import { getNewNormalizedObject } from 'jsonapi-front';
import { getInitFilters } from './initFilters';

const initialState = {
  emptyItem: null,
  items: getNewNormalizedObject('FreeFW_Alert'),
  filters: getInitFilters(),
  sort: [{ col: 'alert_from', way: 'up' }],
  pendings: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: "1",
  tabs: [
    { key: '1', name: 'ident', label: 'Identification', shortcut: 'I'},
    { key: '2', name: 'list', label: 'Sous-tâches', shortcut: 'C'},
    { key: '3', name: 'desc', label: 'Description', shortcut: 'D'},
    { key: '4', name: 'recu', label: 'Récurrence / Rappel', shortcut: 'R'},
  ],
  loadMorePending: false,
  loadMoreError: null,
  loadPendingsPending: false,
  loadPendingsError: null,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  createOnePending: false,
  createOneError: null,
};

export default initialState;
