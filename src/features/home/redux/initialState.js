const initialState = {
  geoOn: false,
  geoCoord: {},
  loadAllFinish : false,
  loadAllPending: false,
  loadAllError: null,
  socket: null,
  socketOn: false,
  socketConnected: false,
  socketMessage: null,
  loadPublicPending: false,
  loadPublicError: null,
};

export default initialState;
