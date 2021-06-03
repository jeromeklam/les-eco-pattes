import { App } from '../features/home';
import { PageNotFound } from '../features/ui';
import _ from 'lodash';
import aboutRoute from '../features/about/route';
import agendaRoute from '../features/agenda/route';
import alertRoute from '../features/alert/route';
import alertCategoryRoute from '../features/alert-category/route';
import authRoute from '../features/auth/route';
import causeRoute from '../features/cause/route';
import causeGrowthRoute from '../features/cause-growth/route';
import causeMainTypeRoute from '../features/cause-main-type/route';
import causeMovementRoute from '../features/cause-movement/route';
import causeSicknessRoute from '../features/cause-sickness/route';
import causeTypeRoute from '../features/cause-type/route';
import clientRoute from '../features/client/route';
import clientCategoryRoute from '../features/client-category/route';
import clientTypeRoute from '../features/client-type/route';
import configRoute from '../features/config/route';
import contractRoute from '../features/contract/route';
import countryRoute from '../features/country/route';
import dashboardRoute from '../features/dashboard/route';
import dataRoute from '../features/data/route';
import emailRoute from '../features/email/route';
import familyRoute from '../features/family/route';
import helpRoute from '../features/help/route';
import homeRoute from '../features/home/route';
import iconsRoute from '../features/icons/route';
import itemRoute from '../features/item/route';
import langRoute from '../features/lang/route';
import mapRoute from '../features/map/route';
import movementRoute from '../features/movement/route';
import sicknessRoute from '../features/sickness/route';
import siteRoute from '../features/site/route';
import siteTypeRoute from '../features/site-type/route';
import stockRoute from '../features/stock/route';
import uiRoute from '../features/ui/route';
import unitRoute from '../features/unit/route';
import userRoute from '../features/user/route';
import editionRoute from '../features/edition/route';
import historyRoute from '../features/history/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  aboutRoute,
  agendaRoute,
  alertRoute,
  alertCategoryRoute,
  authRoute,
  causeRoute,
  causeGrowthRoute,
  causeMainTypeRoute,
  causeMovementRoute,
  causeSicknessRoute,
  causeTypeRoute,
  clientRoute,
  clientCategoryRoute,
  clientTypeRoute,
  configRoute,
  contractRoute,
  countryRoute,
  dashboardRoute,
  dataRoute,
  emailRoute,
  familyRoute,
  helpRoute,
  iconsRoute,
  itemRoute,
  langRoute,
  mapRoute,
  movementRoute,
  sicknessRoute,
  siteRoute,
  siteTypeRoute,
  stockRoute,
  uiRoute,
  unitRoute,
  userRoute,
  editionRoute,
  historyRoute,
];

const routes = [
  {
    path: '/',
    component: App,
    childRoutes: [
      ...childRoutes,
      { path: '*', name: 'Page not found', component: PageNotFound },
    ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
  },
];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, child => child.isIndex);
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
