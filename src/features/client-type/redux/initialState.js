import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_ClientType'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  sort: [{col:"clit_name",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  loadOnePending: false,
  loadOneError: null,
  updateOnePending: false,
  updateOneError: null,
};

export default initialState;
