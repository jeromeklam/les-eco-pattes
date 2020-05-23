import { PigeonMap } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'pigeon-map', name: 'Pigeon map', component: PigeonMap, auth: 'PRIVATE' },
    { path: 'pigeon-map/:id', name: 'PigeonMap Pose', component: PigeonMap, auth: 'PRIVATE' },
    { path: 'pigeon-map/:id/:lat/:lon', name: 'PigeonMap Zoom', component: PigeonMap, auth: 'PRIVATE' },
  ],
};
