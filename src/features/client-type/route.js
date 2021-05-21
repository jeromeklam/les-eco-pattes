import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'client-type', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'client-type/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'client-type/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
