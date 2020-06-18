import { Wampy } from 'wampy';

export const initSocket = (options={}) => {
  const myOptions = {
    realm: 'LesEcoPattes',
    reconnectInterval: 1000,
    maxRetries: 999,
    debug: false,
    autoReconnect: true,
    onConnect: options.onConnected || (welcomeDetails => { console.log('WAMPY : Yahoo! We are online! Details:', welcomeDetails); }),
    onReconnect: () => { console.log('WAMPY : Reconnecting...'); },
    onReconnectSuccess: options.onConnected || (welcomeDetails => { console.log('WAMPY : Yahoo! We are online! Details:', welcomeDetails); }),
    onClose: options.onDisconnected || (() => { console.log('WAMPY : See you next time!'); }),
    onError: options.onDisconnected || (() => { console.log('WAMPY : See you next time!'); }),
  };
  if (process.env.REACT_APP_WS_URL !== '') {
    const ws = new Wampy(process.env.REACT_APP_WS_URL, myOptions);
    if (options.subscriptions) {
      Object.keys(options.subscriptions).forEach((key) => {
        ws.subscribe(key, {
          onSuccess: datas => {
            console.log(`WAMPY : Successfully subscribed to ${key}`);
          },
          onError: datas => {
            console.log(`WAMPY : Error subscribed to ${key}`);
          },
          onEvent: options.subscriptions[key],
        });
      });
    }
    return ws;
  } else {
    return null;
  }
};