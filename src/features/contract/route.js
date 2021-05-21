import { List, Input } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'contract', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'contract/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'contract/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};