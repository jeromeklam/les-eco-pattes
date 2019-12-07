// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html


export default {
  path: '',
  name: '',
  isIndex: true,
  childRoutes: [
    { path: 'map', name: 'Map', component: Map, auth: 'PRIVATE' },
  ],
};
