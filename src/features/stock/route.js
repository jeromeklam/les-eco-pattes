import { TreeviewList } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'stock', name: 'Stock', component: TreeviewList, auth: 'PRIVATE' },
  ],
};
