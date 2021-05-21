import { List, Input } from './';

export default {
  path: '',
  name: '',
   childRoutes: [
    { path: 'alert', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'alert/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'alert/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};