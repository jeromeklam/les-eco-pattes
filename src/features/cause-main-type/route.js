// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  List,
  Create,
  Modify,
} from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'cause-main-type', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'cause-main-type/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'cause-main-type/modify/:id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};