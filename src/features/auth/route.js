// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Signin,
  Signout,
} from './';

export default {
  path: 'auth',
  name: 'Auth',
  childRoutes: [
    { path: 'signin', name: 'Connexion', component: Signin, isIndex: true },
    { path: 'signout', name: 'Deconnexion', component: Signout, isIndex: true },
  ],
};
