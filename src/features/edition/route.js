import { List, Input } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'edition', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'edition/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'edition/modify/:ediId', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};