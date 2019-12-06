// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {List, Modify, Create} from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'client-category', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'client-category/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'client-category/modify/:id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
