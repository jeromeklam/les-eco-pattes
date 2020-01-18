import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'cause', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'cause/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'cause/modify/:causeId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
