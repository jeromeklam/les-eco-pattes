import { List, Input } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'email', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'email/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'email/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
