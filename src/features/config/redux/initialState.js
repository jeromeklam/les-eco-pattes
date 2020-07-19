const initialState = {
  items: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  filters: [],
  loadMorePending: false,
  loadMoreError: null,
  LoadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: false,
  updateOnePending: false,
  updateOneError: null,
  createOnePending: false,
  createOneError: null
};

export default initialState;
