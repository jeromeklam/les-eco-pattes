import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'site', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'site/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'site/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
