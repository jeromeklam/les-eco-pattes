import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
   childRoutes: [
    { path: 'alert', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'alert/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'alert/modify/:ctId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};