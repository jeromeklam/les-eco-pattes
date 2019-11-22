// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'site-type', name: 'List', component: List, auth: 'PUBLIC' },
    { path: 'site-type/create', name: 'Create', component: Create, auth: 'PUBLIC' },
    { path: 'site-type/modify/:siteTypeId', name: 'Modify', component: Modify, auth: 'PUBLIC' },
  ],
};
