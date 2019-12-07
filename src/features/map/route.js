// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { PigeonMap } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'pigeon-map', name: 'Pigeon map', component: PigeonMap, auth: 'PRIVATE' },
  ],
};
