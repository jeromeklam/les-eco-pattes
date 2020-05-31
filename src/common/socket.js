import { Wampy } from 'wampy';

const host = process.env.REACT_APP_WS_URL;
const options = {
  realm: 'LesEcoPattes',
  reconnectInterval: 1000,
  maxRetries: 999,
  debug: true,
  autoReconnect: true,
  onConnect: function(welcomeDetails) {
    console.log('WAMPY : Yahoo! We are online! Details:', welcomeDetails);
  },
  onClose: function() {
    console.log('WAMPY : See you next time!');
  },
  onError: function() {
    console.log('WAMPY : Breakdown happened');
  },
  onReconnect: function() {
    console.log('WAMPY : Reconnecting...');
  },
  onReconnectSuccess: function(welcomeDetails) {
    console.log('WAMPY : Reconnection succeeded. Details:', welcomeDetails);
  },
};

export const initSocket = () => {
  const ws = new Wampy(host, options);
  return ws;
};