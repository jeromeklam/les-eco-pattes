// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Signin,
} from './';

export default {
  path: 'auth',
  name: 'Auth',
  childRoutes: [
    { path: 'signin', name: 'Identification', component: Signin, isIndex: true },
  ],
};
