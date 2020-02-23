import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'movement', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'movement/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'movement/modify/move:Id', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};
