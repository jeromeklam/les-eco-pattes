import { Filter } from 'freeassofront';

const initialState = {
  items: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: "1",
  tabs: [
    {key:"1", name:"identity", label:"Identité", shortcut:"I", icon:"client"},
    {key:"2", name:"complement", label:"Complément", shortcut:"C", icon:"misc"},
  ], 
  filters: new Filter(),
  sort: [{col:"cli_lastname",way:"up"}, {col:"cli_firstname",way:"up"}],
  loadMorePending: false,
  loadMoreError: null,
  loadMoreFinish: false,
  loadOnePending: false,
  loadOneError: null,
  loadOneItem: null,
  updateOnePending: false,
  updateOneError: null,
  delOnePending: false,
  delOneError: null,
  createOnePending: false,
  createOneError: null,
  loadCliSpecPending: false,
  loadCliSpecError: null,
};

export default initialState;
