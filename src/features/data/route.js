// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import { List, Modify } from './';

export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'data', name: 'List', component: List, auth: 'PUBLIC' },
    { path: 'data/modify/:dataId', name: 'List', component: Modify, auth: 'PUBLIC' },
  ],
};
