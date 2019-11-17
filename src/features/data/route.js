// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { List, Form } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'data', name: 'List', component: List, auth: 'PUBLIC' },
    { path: 'data/modify/:dataId', name: 'Modify', component: Form, auth: 'PUBLIC' },
  ],
};
