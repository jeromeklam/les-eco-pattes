import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'movement', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'movement/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'movement/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
