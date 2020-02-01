import {Filter} from 'freeassofront';

const initialState = {
  items: [],
  models: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: new Filter(),
  sort: [{col:"data_name",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: false,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null,
};

export default initialState;
