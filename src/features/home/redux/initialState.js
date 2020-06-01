const initialState = {
  geoOn: false,
  geoCoord: {},
  loadAllFinish : false,
  loadAllPending: false,
  loadAllError: null,
  socket: null,
  socketOn: true,
  socketConnected: false,
  socketMessage: null,
};

export default initialState;
