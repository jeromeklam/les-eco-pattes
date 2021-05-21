import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'data', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'data/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'data/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
