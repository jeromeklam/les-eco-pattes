import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import siteReducer from '../features/site/redux/reducer';
import authReducer from '../features/auth/redux/reducer';
import iconsReducer from '../features/icons/redux/reducer';
import causeReducer from '../features/cause/redux/reducer';
import dataReducer from '../features/data/redux/reducer';
import aboutReducer from '../features/about/redux/reducer';
import siteTypeReducer from '../features/site-type/redux/reducer';
import causeTypeReducer from '../features/cause-type/redux/reducer';
import configReducer from '../features/config/redux/reducer';
import causeMainTypeReducer from '../features/cause-main-type/redux/reducer';
import emailReducer from '../features/email/redux/reducer';
import langReducer from '../features/lang/redux/reducer';
import clientReducer from '../features/client/redux/reducer';
import clientTypeReducer from '../features/client-type/redux/reducer';
import clientCategoryReducer from '../features/client-category/redux/reducer';
import mapReducer from '../features/map/redux/reducer';
import dashboardReducer from '../features/dashboard/redux/reducer';
import uiReducer from '../features/ui/redux/reducer';
import causeMovementReducer from '../features/cause-movement/redux/reducer';
import countryReducer from '../features/country/redux/reducer';
import alertReducer from '../features/alert/redux/reducer';
import helpReducer from '../features/help/redux/reducer';
import causeGrowthReducer from '../features/cause-growth/redux/reducer';
import sicknessReducer from '../features/sickness/redux/reducer';
import stockReducer from '../features/stock/redux/reducer';
import familyReducer from '../features/family/redux/reducer';
import unitReducer from '../features/unit/redux/reducer';
import itemReducer from '../features/item/redux/reducer';
import causeSicknessReducer from '../features/cause-sickness/redux/reducer';
import { highlightReducer } from 'freeassofront';
import movementReducer from '../features/movement/redux/reducer';
import agendaReducer from '../features/agenda/redux/reducer';
import contractReducer from '../features/contract/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  site: siteReducer,
  auth: authReducer,
  icons: iconsReducer,
  cause: causeReducer,
  data: dataReducer,
  about: aboutReducer,
  siteType: siteTypeReducer,
  causeType: causeTypeReducer,
  config: configReducer,
  causeMainType: causeMainTypeReducer,
  email: emailReducer,
  lang: langReducer,
  client: clientReducer,
  clientType: clientTypeReducer,
  clientCategory: clientCategoryReducer,
  map: mapReducer,
  dashboard: dashboardReducer,
  ui: uiReducer,
  causeMovement: causeMovementReducer,
  country: countryReducer,
  alert: alertReducer,
  help: helpReducer,
  causeGrowth: causeGrowthReducer,
  sickness: sicknessReducer,
  stock: stockReducer,
  family: familyReducer,
  unit: unitReducer,
  item: itemReducer,
  causeSickness: causeSicknessReducer,
  tour: highlightReducer,
  movement: movementReducer,
  agenda: agendaReducer,
  contract: contractReducer,
};

export default combineReducers(reducerMap);
