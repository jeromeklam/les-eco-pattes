import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Data'),
  models: [],
  page_number: 1,
  page_size: 999999,
  sort: [{col:"data_name",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: false,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null,
};

export default initialState;
