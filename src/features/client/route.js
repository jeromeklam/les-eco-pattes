import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'client', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'client/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'client/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
