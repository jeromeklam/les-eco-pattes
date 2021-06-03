import { getNewNormalizedObject } from 'jsonapi-front';
import { getInitFilters } from './initFilters';

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Site'),
  totalItems: 0,
  selected: [],
  causes: [],
  causesModels: [],
  photos: [],
  documents: [],
  documentsModels: [],
  currentItem: null,
  page_number: 1,
  page_size: 999999,
  tab: '1',
  filters: getInitFilters(),
  sort: [{col:"site_name",way:"up"}],
  properties: [
    'number_1',
    'string_1',
    'string_2',
    'number_6',
    'string_7',
    'string_8',
    'number_3',
    'string_3',
    'string_0',
    'number_4',
    'string_4',
    'number_8',
    'number_7',
    'string_5',
    'number_5',
    'bool_1',
    'string_0',
    'string_6',
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
  updateSiteMediaDescPending: false,
  updateSiteMediaDescError: null,
  printOnePending: false,
  printOneError: null,
};

export default initialState;
