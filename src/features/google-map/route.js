// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { Map } from './'; 

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'google-map', name: 'Map', component: Map, auth: 'PRIVATE' },
  ],
};
