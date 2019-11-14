// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  List,
} from './';

export default {
  path: 'site',
  name: 'Site',
  auth: 'PRIVATE',
  childRoutes: [
    { path: 'list', name: 'Liste', component: List, isIndex: true, auth: 'PRIVATE' },
  ],
};
