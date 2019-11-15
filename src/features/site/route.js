// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  List,
} from './';

export default {
  path: '',
  name: '',
  auth: 'PRIVATE',
  childRoutes: [
    { path: 'site', name: 'List', component: List, isIndex: true, auth: 'PUBLIC' },
    { path: 'site/modify', name: 'Modify', component: List, auth: 'PUBLIC' },
  ],
};
