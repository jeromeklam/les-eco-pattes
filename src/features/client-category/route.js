// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {List} from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'client-category', name: 'List', component: List, auth: 'PRIVATE' }
  ],
};
