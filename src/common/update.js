import {
  DATA_UPDATE_ONE_UPDATE,
} from '../features/data/redux/constants';
import {
  SITE_TYPE_UPDATE_ONE_UPDATE,
} from '../features/site-type/redux/constants';
import {
  CAUSE_TYPE_UPDATE_ONE_UPDATE,
} from '../features/cause-type/redux/constants';
import {
  SITE_UPDATE_ONE_UPDATE,
} from '../features/site/redux/constants';
import {
  CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE,
} from '../features/cause-main-type/redux/constants';
import {
  EMAIL_UPDATE_ONE_UPDATE,
} from '../features/email/redux/constants';

export function propagateModel(type, model) {
  return (dispatch) => {
    switch (type) {
      case 'FreeAsso_Site':
        dispatch({
          type: SITE_UPDATE_ONE_UPDATE,
          data: model
        });
        break;
      case 'FreeAsso_Data':
        dispatch({
          type: DATA_UPDATE_ONE_UPDATE,
          data: model
        });
        break;
      case 'FreeAsso_SiteType':
        dispatch({
          type: SITE_TYPE_UPDATE_ONE_UPDATE,
          data: model
        });
        break;
      case 'FreeAsso_CauseType':
        dispatch({
          type: CAUSE_TYPE_UPDATE_ONE_UPDATE,
          data: model
        });
      case 'FreeAsso_CauseMainType':
        dispatch({
          type: CAUSE_MAIN_TYPE_UPDATE_ONE_UPDATE,
          data: model
        });
      case 'FreeFW_Email':
        dispatch({
          type: EMAIL_UPDATE_ONE_UPDATE,
          data: model
        });
      break;
    }
  }
}
