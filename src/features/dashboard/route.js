import { Dashboard } from './';

export default {
  path: '/',
  name: 'Dashboard',
  childRoutes: [{ path: 'dashboard', name: 'Dashboard', component: Dashboard, isIndex: true }],
};
