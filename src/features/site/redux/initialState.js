import { Filter, FILTER_MODE_AND, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL, FILTER_OPER_EQUAL } from 'freeassofront';
import { getNewNormalizedObject } from 'freejsonapi';

let initialFilters = new Filter();
const now = new Date().toISOString();
initialFilters.addFilter('site_to', now, FILTER_OPER_GREATER_OR_EQUAL_OR_NULL);
initialFilters.addFilter('site_extern', false, FILTER_OPER_EQUAL);
initialFilters.setMode(FILTER_MODE_AND);

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Site'),
  causes: [],
  causesModels: [],
  photos: [],
  documents: [],
  documentsModels: [],
  currentItem: null,
  page_number: 1,
  page_size: 999999,
  tab: '1',
  filters: initialFilters,
  sort: [{col:"site_name",way:"up"}],
  properties: [
    'number_1',
    'string_1',
    'string_2',
    'number_6',
    'string_7',
    'number_3',
    'number_4',
    'string_4',
    'string_3',
    'number_5',
    'string_5',
    'string_6',
    'bool_1',
  ],
  quickSearch: '',
  mobileQuickSearch: false,
  loadMorePending: false,
  loadMoreFinish: false,
  loadMoreError: null,
  loadOnePending: false,
  loadOneItem: null,
  loadOneRaw: null,
  loadOneError: null,
  createOnePending: false,
  createOneError: null,
  updateOnePending: false,
  updateOneError: null,
  filterPending: false,
  filterError: null,
  delOnePending: false,
  delOneError: null,
  loadCausesPending: false,
  loadCausesError: null,
  loadPhotosPending: false,
  loadPhotosError: null,
  uploadSiteMediaPending: false,
  uploadSiteMediaError: null,
  delSiteMediaPending: false,
  delSiteMediaError: null,
  loadDocumentsPending: false,
  loadDocumentsError: null,
};

export default initialState;
