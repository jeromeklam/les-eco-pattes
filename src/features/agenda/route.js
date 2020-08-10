import { DefaultPage } from './';

export default {
  path: 'agenda',
  name: 'Agenda',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true, auth: 'PRIVATE' },
  ],
};
