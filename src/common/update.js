import { DATA_UPDATE_ONE_UPDATE } from '../features/data/redux/constants';
import { SITE_TYPE_UPDATE_ONE_UPDATE } from '../features/site-type/redux/constants';
import { CAUSE_TYPE_UPDATE_ONE_UPDATE } from '../features/cause-type/redux/constants';
import { SITE_UPDATE_ONE_UPDATE } from '../features/site/redux/constants';
import { CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE } from '../features/cause-main-type/redux/constants';
import { EMAIL_UPDATE_ONE_UPDATE } from '../features/email/redux/constants';
import { CAUSE_UPDATE_ONE_UPDATE } from '../features/cause/redux/constants';
import { CLIENT_UPDATE_ONE_UPDATE } from '../features/client/redux/constants';
import { CLIENT_TYPE_UPDATE_ONE_UPDATE } from '../features/client-type/redux/constants';
import { CLIENT_CATEGORY_UPDATE_ONE_UPDATE } from '../features/client-category/redux/constants';
import { CAUSE_MOVEMENT_UPDATE_MODEL } from '../features/cause-movement/redux/constants';
import { CAUSE_SICKNESS_UPDATE_ONE_UPDATE } from '../features/cause-sickness/redux/constants';
import { SICKNESS_UPDATE_ONE_UPDATE } from '../features/sickness/redux/constants';
import { ITEM_UPDATE_ONE_UPDATE } from '../features/item/redux/constants';
import { MOVEMENT_UPDATE_ONE_UPDATE } from '../features/movement/redux/constants';
import { ALERT_UPDATE_ONE_UPDATE } from '../features/alert/redux/constants';
import { CONTRACT_UPDATE_ONE_UPDATE } from '../features/contract/redux/constants';
import { AUTH_UPDATE_ONE_UPDATE } from '../features/auth/redux/constants';
import { USER_UPDATE_ONE_UPDATE } from '../features/user/redux/constants';
import { AGENDA_PROPAGATE } from '../features/agenda/redux/constants';

export function propagateCreate(type, id, datas) {
  return propagateModel(type, {data: datas });
}

export function propagateUpdate(type, id, datas) {
  return propagateModel(type, {data: datas });
}

export function propagateDelete(type, id, datas) {
  return dispatch => {
  };
}

export function propagateModel(type, model) {
  return dispatch => {
    switch (type) {
      case 'FreeFW_Alert':
        dispatch({
          type: ALERT_UPDATE_ONE_UPDATE,
          data: model,
        });
        dispatch({
          type: AGENDA_PROPAGATE,
          data: model,
        });
        break;
      case 'FreeAsso_Cause':
        dispatch({
          type: CAUSE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_CauseMainType':
        dispatch({
          type: CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_CauseType':
        dispatch({
          type: CAUSE_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
     case 'FreeAsso_CauseMovement':
        dispatch({
          type: CAUSE_MOVEMENT_UPDATE_MODEL,
          data: model,
        });
        dispatch({
          type: CAUSE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_CauseSickness':
        dispatch({
          type: CAUSE_SICKNESS_UPDATE_ONE_UPDATE,
          data: model,
        });
        dispatch({
          type: CAUSE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Client':
        dispatch({
          type: CLIENT_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_ClientCategory':
        dispatch({
          type: CLIENT_CATEGORY_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_ClientType':
        dispatch({
          type: CLIENT_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Contract':
        dispatch({
          type: CONTRACT_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Data':
        dispatch({
          type: DATA_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeFW_Email':
        dispatch({
          type: EMAIL_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Item':
        dispatch({
          type: ITEM_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Movement':
        dispatch({
          type: MOVEMENT_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Sickness':
        dispatch({
          type: SICKNESS_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Site':
        dispatch({
          type: SITE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_SiteType':
        dispatch({
          type: SITE_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeSSO_User':
        dispatch({
          type: USER_UPDATE_ONE_UPDATE,
          data: model,
        });
        dispatch({
          type: AUTH_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;    
      default:
        break;
    }
  };
}
