import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'sickness', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'sickness/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'sickness/modify/:sickId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
