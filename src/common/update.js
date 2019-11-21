import {
  DATA_UPDATE_ONE_UPDATE,
} from '../features/data/redux/constants';
import {
  SITE_TYPE_UPDATE_ONE_UPDATE,
} from '../features/site-type/redux/constants';
import {
  CAUSE_TYPE_UPDATE_ONE_UPDATE,
} from '../features/cause-type/redux/constants';


export function propagateModel(type, model) {
  return (dispatch) => {
    switch (type) {
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
      break;
    }
  }
}
