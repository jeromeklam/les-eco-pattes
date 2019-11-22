// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'cause', name: 'List', component: List, auth: 'PUBLIC' },
    { path: 'cause/create', name: 'Create', component: Create, auth: 'PUBLIC' },
    { path: 'cause/modify/:causeId', name: 'Modify', component: Modify, auth: 'PUBLIC' },
  ],
};
