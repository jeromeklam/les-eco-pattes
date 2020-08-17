import { Filter } from 'freeassofront';

const initialState = {
  filters: new Filter(),
  sort: [{ col: 'alert_ts', way: 'down' }],
  items: [],
  pendings: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  loadMorePending: false,
  loadMoreError: null,
  loadPendingsPending: false,
  loadPendingsError: null,
};

export default initialState;
