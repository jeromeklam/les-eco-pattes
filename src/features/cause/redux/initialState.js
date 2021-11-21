import { getNewNormalizedObject } from 'jsonapi-front';
import { getInitFilters } from './initFilters';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Cause'),
  totalItems: 0,
  selected: [],
  movements: [],
  documents: [],
  photos: [],
  currentItem: null,
  currentTab: null,
  causes: [],
  causesModels: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: '1',
  filters: getInitFilters(),
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
  exportAsTabPending: false,
  exportAsTabError: null,
  printOnePending: false,
  printOneError: null,
  checkOneMediaPending: false,
  checkOneMediaError: null,
  exportPending: false,
  exportError: null,
};

export default initialState;
