import { getNewNormalizedObject } from 'jsonapi-tools';

const initialState = {
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  items: getNewNormalizedObject('FreeAsso_Sickness'),
  page_number: 1,
  page_size: 999999,
  sort: [{col:"sick_name",way:"up"}],
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  loadOneRaw: null,
  updateOnePending: false,
  updateOneError: null,   
};

export default initialState;
