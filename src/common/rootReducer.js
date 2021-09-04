import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'
import { highlightReducer } from 'react-bootstrap-front';
import history from './history';
import homeReducer from '../features/home/redux/reducer';
import aboutReducer from '../features/about/redux/reducer';
import agendaReducer from '../features/agenda/redux/reducer';
import alertReducer from '../features/alert/redux/reducer';
import alertCategoryReducer from '../features/alert-category/redux/reducer';
import authReducer from '../features/auth/redux/reducer';
import causeReducer from '../features/cause/redux/reducer';
import causeGrowthReducer from '../features/cause-growth/redux/reducer';
import causeMainTypeReducer from '../features/cause-main-type/redux/reducer';
import causeMovementReducer from '../features/cause-movement/redux/reducer';
import causeSicknessReducer from '../features/cause-sickness/redux/reducer';
import causeTypeReducer from '../features/cause-type/redux/reducer';
import clientReducer from '../features/client/redux/reducer';
import clientCategoryReducer from '../features/client-category/redux/reducer';
import clientTypeReducer from '../features/client-type/redux/reducer';
import configReducer from '../features/config/redux/reducer';
import contractReducer from '../features/contract/redux/reducer';
import countryReducer from '../features/country/redux/reducer';
import dashboardReducer from '../features/dashboard/redux/reducer';
import dataReducer from '../features/data/redux/reducer';
import emailReducer from '../features/email/redux/reducer';
import familyReducer from '../features/family/redux/reducer';
import helpReducer from '../features/help/redux/reducer';
import iconsReducer from '../features/icons/redux/reducer';
import itemReducer from '../features/item/redux/reducer';
import langReducer from '../features/lang/redux/reducer';
import mapReducer from '../features/map/redux/reducer';
import movementReducer from '../features/movement/redux/reducer';
import sicknessReducer from '../features/sickness/redux/reducer';
import siteReducer from '../features/site/redux/reducer';
import siteTypeReducer from '../features/site-type/redux/reducer';
import stockReducer from '../features/stock/redux/reducer';
import uiReducer from '../features/ui/redux/reducer';
import unitReducer from '../features/unit/redux/reducer';
import userReducer from '../features/user/redux/reducer';
import editionReducer from '../features/edition/redux/reducer';
import historyReducer from '../features/history/redux/reducer';
import inboxReducer from '../features/inbox/redux/reducer';
import jobqueueReducer from '../features/jobqueue/redux/reducer';
import commonReducer from '../features/common/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter(history),
  tour: highlightReducer,
  home: homeReducer,
  about: aboutReducer,
  agenda: agendaReducer,
  alert: alertReducer,
  alertCategory: alertCategoryReducer,
  auth: authReducer,
  cause: causeReducer,
  causeGrowth: causeGrowthReducer,
  causeMainType: causeMainTypeReducer,
  causeMovement: causeMovementReducer,
  causeSickness: causeSicknessReducer,
  causeType: causeTypeReducer,
  client: clientReducer,
  clientCategory: clientCategoryReducer,
  clientType: clientTypeReducer,
  config: configReducer,
  contract: contractReducer,
  country: countryReducer,
  dashboard: dashboardReducer,
  data: dataReducer,
  email: emailReducer,
  family: familyReducer,
  help: helpReducer,
  icons: iconsReducer,
  item: itemReducer,
  lang: langReducer,
  map: mapReducer,
  movement: movementReducer,
  sickness: sicknessReducer,
  site: siteReducer,
  siteType: siteTypeReducer,
  stock: stockReducer,
  ui: uiReducer,
  unit: unitReducer,
  user: userReducer,
  edition: editionReducer,
  history: historyReducer,
  inbox: inboxReducer,
  jobqueue: jobqueueReducer,
  common: commonReducer,
};

export default combineReducers(reducerMap);
