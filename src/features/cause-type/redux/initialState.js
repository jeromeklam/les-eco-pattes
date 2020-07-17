import { getNewNormalizedObject } from 'freejsonapi';
import { Filter } from 'freeassofront';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_CauseType'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"caut_name",way:"up"}],
  loadMorePending: false,
  loadModeFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneItem: null,
  loadOneError: null,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null
};

export default initialState;
