const now = new Date();
const initialState = {
  current_date: now,
  start_date: now,
  end_date: now,
  events: [],
  resources: [],
  loadEventsPending: false,
  loadEventsError: null,
};

export default initialState;
