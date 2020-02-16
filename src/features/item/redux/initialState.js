import { Filter } from 'freeassofront';

const initialState = {
  items: [],
  loadOneItem: null,
  loadOneRaw: null,
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"item_name",way:"up"}],
  loadOnePending: false,
  loadOneError: null,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null,
};

export default initialState;