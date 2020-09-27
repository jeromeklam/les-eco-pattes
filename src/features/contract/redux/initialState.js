import { getNewNormalizedObject } from 'jsonapi-tools';
import { getInitFilters } from './initFilters';

const tabs = [
  { key: '1', name: 'identification', label: 'Identification', shortcut: 'I' },
  { key: '2', name: 'contact', label: 'Contacts', shortcut: 'C' },
  { key: '3', name: 'document', label: 'Documents', shortcut: 'D' },
];

const initialState = {
  items: getNewNormalizedObject('FreeAsso_Contract'),
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: getInitFilters(),
  sort: [{col:"ct_code",way:"down"}],
  tab: '1',
  tabs: tabs,
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  createOnePending: false,
  createOneError: null,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  uploadContractMediaPending: false,
  uploadContractMediaError: null,
  delContractMediaPending: false,
  delContractMediaError: null,
};

export default initialState;
