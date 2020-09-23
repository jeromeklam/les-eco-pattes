import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  items: getNewNormalizedObject('FreeAsso_Sickness'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
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
