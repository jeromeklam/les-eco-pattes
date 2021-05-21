import { getNewNormalizedObject } from 'jsonapi-front';
import { Filter } from 'react-bootstrap-front';

const initialState = {
  items: getNewNormalizedObject('FreeFW_Edition'),
  versions: {},
  emptyVersion: null,
  version: null,
  totalItems: 0,
  page_number: 1,
  page_size: 999999,
  filters: new Filter(),
  sort: [{col:"edi_name", way:"up"}],
  models: [],
  loadMorePending: false,
  loadMoreError: null,
  createOnePending: false,
  createOneError: null,
  delOnePending: false,
  delOneError: null,
  loadOnePending: false,
  loadOneError: null,
  updateOnePending: false,
  updateOneError: null,
  loadVersionsPending: false,
  loadVersionsError: null,
  loadOneVersionPending: false,
  loadOneVersionError: null,
};

export default initialState;
