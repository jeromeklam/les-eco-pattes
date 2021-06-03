import { getNewNormalizedObject } from 'jsonapi-front';
import { Filter } from 'react-bootstrap-front';

const initialState = {
  filters: new Filter(),
  sort: [{ col: 'hist_ts', way: 'down' }],
  items: getNewNormalizedObject('POFW_History'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  loadMorePending: false,
  loadMoreError: null,
};

export default initialState;
