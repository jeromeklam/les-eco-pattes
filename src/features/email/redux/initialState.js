import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  items: getNewNormalizedObject('FreeFW_Email'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: [],
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneError: null,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
};

export default initialState;
