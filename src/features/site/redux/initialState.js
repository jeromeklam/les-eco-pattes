// Initial state is the place you define all initial values for the Redux store of the feature.
// In the 'standard' way, initialState is defined in reducers: http://redux.js.org/docs/basics/Reducers.html
// But when application grows, there will be multiple reducers files, it's not intuitive what data is managed by the whole store.
// So Rekit extracts the initial state definition into a separate module so that you can have
// a quick view about what data is used for the feature, at any time.

// NOTE: initialState constant is necessary so that Rekit could auto add initial state when creating async actions.
const initialState = {
  items: [],
  page_number: 1,
  page_size: process.env.REACT_APP_PAGE_SIZE,
  tab: "1",
  tabs: [
    {key:"1", name:"localisation", label:"Localisation", shortcut:"L", icon:"location"},
    {key:"2", name:"equipement", label:"Equipement", shortcut:"E", icon:"settings"},
    {key:"3", name:"divers", label:"Divers", shortcut:"D", icon:"misc"}
  ], 
  filters: [],
  properties: ["string_1","string_2","string_3","string_4",
              "number_1","number_2","number_3","number_4",
              "date_1","date_2","date_3","date_4",
              "text_1","text_2","text_3","text_4",
              "bool_1","bool_2","bool_3","bool_4"],
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
  updateOneError: null
};

export default initialState;
