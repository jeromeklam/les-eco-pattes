import { getNewNormalizedObject } from 'jsonapi-front';
import { Filter } from 'react-bootstrap-front';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Movement'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"move_from",way:"down"}],
  tab: '1',
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOneItem: null,
  loadOneRaw: null,
  loadOnePending: false,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  filterPending: false,
  filterError: null,
};

export default initialState;
