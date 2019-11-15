import {
  Home,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'home',
      name: 'Home',
      component: Home,
      isIndex: true,
    },
  ],
};
