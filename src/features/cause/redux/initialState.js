import { Filter } from 'freeassofront';

const initialState = {
  items: [],
  movements: [],
  documents: [],
  currentItem: null,
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: '1',
  tabs: [
    { key: '1', name: 'identification', label: 'Identification', shortcut: 'A', icon: 'cause' },
    { key: '2', name: 'divers', label: 'Divers', shortcut: 'D', icon: 'misc' },
  ],
  filters: new Filter(),
  sort: [{ col: 'cau_code', way: 'up' }],
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
};

export default initialState;
