import { getNewNormalizedObject } from 'freejsonapi';
import { Filter } from 'freeassofront';

const initialState = {
  emptyItem: null,
  items: getNewNormalizedObject('FreeFW_Alert'),
  filters: new Filter(),
  sort: [{ col: 'alert_from', way: 'down' }],
  pendings: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: "1",
  tabs: [
    { key: '1', name: 'ident', label: 'Identification', shortcut: 'I'},
    { key: '2', name: 'desc', label: 'Détails', shortcut: 'D'},
    { key: '3', name: 'done', label: 'Réalisation', shortcut: 'R'},
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
