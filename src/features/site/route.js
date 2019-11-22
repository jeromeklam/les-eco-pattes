// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'site', name: 'List', component: List, auth: 'PUBLIC' },
    { path: 'site/create', name: 'Create', component: Create, auth: 'PUBLIC' },
    { path: 'site/modify/:siteId', name: 'Modify', component: Modify, auth: 'PUBLIC' },
  ],
};
