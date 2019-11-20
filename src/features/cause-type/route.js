// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { List, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'cause-type', name: 'List', component: List, auth: 'PUBLIC' },
    { path: 'cause-type/modify/:causeTypeId', name: 'Modify', component: Modify, auth: 'PUBLIC' },
  ],
};
