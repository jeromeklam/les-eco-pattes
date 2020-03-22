import { Signin, Signout, AskPassword } from './';

export default {
  path: 'auth',
  name: 'Auth',
  childRoutes: [
    { path: 'signin', name: 'Connexion', component: Signin, isIndex: true },
    { path: 'signout', name: 'Deconnexion', component: Signout, isIndex: true },
    { path: 'ask-password', name: 'Ask password', component: AskPassword },
  ],
};
