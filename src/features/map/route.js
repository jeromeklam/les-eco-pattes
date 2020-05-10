import { PigeonMap } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'pigeon-map', name: 'Pigeon map', component: PigeonMap, auth: 'PRIVATE' },
    { path: 'pigeon-map/:lat/:lon', name: 'PigeonMap Zoom', component: PigeonMap, auth: 'PRIVATE' },
  ],
};
