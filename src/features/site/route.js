// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  List,
  Form,
} from './';

export default {
  path: 'site',
  name: 'site',
  auth: 'PRIVATE',
  component: List,
  childRoutes: [
    { path: 'modify', name: 'Modify', isIndex: true, component: Form, auth: 'PUBLIC' },
  ],
};
