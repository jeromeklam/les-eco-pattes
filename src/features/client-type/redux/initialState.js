import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_ClientType'),
  page_number: 1,
  page_size: 999999,
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
