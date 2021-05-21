import { List, Input } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'cause-type', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'cause-type/create', name: 'Create', component: Input, auth: 'PRIVATE' },
    { path: 'cause-type/modify/:id', name: 'Modify', component: Input, auth: 'PRIVATE' },
  ],
};
