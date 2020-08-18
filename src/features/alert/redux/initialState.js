import { getNewNormalizedObject } from 'freejsonapi';
import { Filter } from 'freeassofront';

const initialState = {
  emptyItem: null,
  items: getNewNormalizedObject('FreeFW_Alert'),
  filters: new Filter(),
  sort: [{ col: 'alert_ts', way: 'down' }],
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
};

export default initialState;
