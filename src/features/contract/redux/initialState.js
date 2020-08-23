import { getNewNormalizedObject } from 'freejsonapi';
import { Filter } from 'freeassofront';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Contract'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"ct_code",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  createOnePending: false,
  createOneError: null,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
};

export default initialState;
