import { getNewNormalizedObject } from 'jsonapi-front';

const initialState = {
  items: getNewNormalizedObject('FreeFW_Jobqueue'),
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  page_number: 1,
  page_size: 999,
};

export default initialState;
