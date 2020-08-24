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
