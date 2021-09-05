const initialState = {
  geoOn: false,
  geoCoord: {},
  locale: 'fr',
  online: true,
  syncing: false,
  syncEnabled: window.localStorage.getItem('proxy_on') === 'yes' ? true : false,
  syncReady: false,
  socket: null,
  socketEnabled: false,
  rightPanelOpened: false,
  filtersCols: null,
  filters: null,
  sort: null,
  onFilter: null,
  panel: 'none',
  panelObj: '',
};

export default initialState;
