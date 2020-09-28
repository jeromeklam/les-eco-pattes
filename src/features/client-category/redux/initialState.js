import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_ClientCategory'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  sort: [{col:"clic_name",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  updateOnePending: false,
  updateOneError: null,
};

export default initialState;
