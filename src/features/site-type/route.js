import { List, Input } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'site-type', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'site-type/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'site-type/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
