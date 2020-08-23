import { List, Create, Modify } from './';

export default {
  path: '',
  name: '',
  childRoutes: [
    { path: 'contract', name: 'List', component: List, auth: 'PRIVATE' },
    { path: 'contract/create', name: 'Create', component: Create, auth: 'PRIVATE' },
    { path: 'contract/modify/:ctId', name: 'Modify', component: Modify, auth: 'PRIVATE' },
  ],
};