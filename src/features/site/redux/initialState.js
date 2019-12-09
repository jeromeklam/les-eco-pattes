// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  items: [],
  page_number: 1,
  page_size: 999999,
  tab: "1",
  tabs: [
    {key:"1", name:"identification", label:"Identification", shortcut:"L", icon:"location"},
    {key:"2", name:"equipement", label:"Equipement", shortcut:"E", icon:"settings"},
    {key:"3", name:"divers", label:"Divers", shortcut:"D", icon:"misc"}
  ], 
  filters: [],
  properties: ["number_1","string_1","string_2","number_3","string_3",,
               "number_4","string_4","bool_1","number_5","string_5","string_6"],
  quickSearch: "",       
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
  delOneError: null
};

export default initialState;
