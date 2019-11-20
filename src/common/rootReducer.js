import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import examplesReducer from '../features/examples/redux/reducer';
import siteReducer from '../features/site/redux/reducer';
import authReducer from '../features/auth/redux/reducer';
import iconsReducer from '../features/icons/redux/reducer';
import causeReducer from '../features/cause/redux/reducer';
import dataReducer from '../features/data/redux/reducer';
import aboutReducer from '../features/about/redux/reducer';
import layoutReducer from '../features/layout/redux/reducer';
import siteTypeReducer from '../features/site-type/redux/reducer';
import causeTypeReducer from '../features/cause-type/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  examples: examplesReducer,
  site: siteReducer,
  auth: authReducer,
  icons: iconsReducer,
  cause: causeReducer,
  data: dataReducer,
  about: aboutReducer,
  layout: layoutReducer,
  siteType: siteTypeReducer,
  causeType: causeTypeReducer,
};

export default combineReducers(reducerMap);
