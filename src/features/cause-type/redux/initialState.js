import { getNewNormalizedObject } from 'freejsonapi';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_CauseType'),
  page_number: 1,
  page_size: 999999,
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
