import { Filter, FILTER_MODE_AND, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL } from 'freeassofront';
import { getNewNormalizedObject } from 'freejsonapi';

let initialFilters = new Filter();
const now = new Date().toISOString();
initialFilters.addFilter('cau_to', now, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL);
initialFilters.setMode(FILTER_MODE_AND);

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Cause'),
  selected: [],
  movements: [],
  documents: [],
  photos: [],
  currentItem: null,
  causes: [],
  causesModels: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: '1',
  filters: initialFilters,
  sort: [{ col: 'cau_code', way: 'up' }],
  properties: [
    'string_1',
  ],
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadItemPrev: null,
  loadOneItem: null,
  loadItemNext: null,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  loadDocumentsPending: false,
  loadDocumentsError: null,
  uploadCauseMediaPending: false,
  uploadCauseMediaError: null,
  delCauseMediaPending: false,
  delCauseMediaError: null,
  loadDescendantsPending: false,
  loadDescendantsError: null,
  loadPhotosPending: false,
  loadPhotosError: null,
  updateCauseMediaDescPending: false,
  updateCauseMediaDescError: null,
};

export default initialState;
