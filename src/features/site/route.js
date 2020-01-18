import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'site', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'site/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'site/modify/:siteId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
