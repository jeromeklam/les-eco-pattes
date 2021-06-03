import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'sickness', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'sickness/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'sickness/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
