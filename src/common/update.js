import { DATA_UPDATE_ONE_UPDATE } from '../features/data/redux/constants';
import { SITE_TYPE_UPDATE_ONE_UPDATE } from '../features/site-type/redux/constants';
import { CAUSE_TYPE_UPDATE_ONE_UPDATE } from '../features/cause-type/redux/constants';
import { SITE_UPDATE_ONE_UPDATE } from '../features/site/redux/constants';
import { CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE } from '../features/cause-main-type/redux/constants';
import { EMAIL_UPDATE_ONE_UPDATE } from '../features/email/redux/constants';
import { CAUSE_UPDATE_ONE_UPDATE } from '../features/cause/redux/constants';
import { CLIENT_TYPE_UPDATE_ONE_UPDATE } from '../features/client-type/redux/constants';
import { CLIENT_CATEGORY_UPDATE_ONE_UPDATE } from '../features/client-category/redux/constants';
import { CAUSE_MOVEMENT_UPDATE_MODEL } from '../features/cause-movement/redux/constants';
import { SICKNESS_UPDATE_ONE_UPDATE } from '../features/sickness/redux/constants';

export function propagateModel(type, model) {
  return dispatch => {
    switch (type) {
      case 'FreeAsso_Site':
        dispatch({
          type: SITE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Cause':
        dispatch({
          type: CAUSE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Data':
        dispatch({
          type: DATA_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_SiteType':
        dispatch({
          type: SITE_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_CauseType':
        dispatch({
          type: CAUSE_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_CauseMainType':
        dispatch({
          type: CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE,
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
      case 'FreeAsso_ClientType':
        dispatch({
          type: CLIENT_TYPE_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_ClientCategory':
        dispatch({
          type: CLIENT_CATEGORY_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeAsso_Sickness':
        dispatch({
          type: SICKNESS_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      case 'FreeFW_Email':
        dispatch({
          type: EMAIL_UPDATE_ONE_UPDATE,
          data: model,
        });
        break;
      default:
        break;
    }
  };
}
