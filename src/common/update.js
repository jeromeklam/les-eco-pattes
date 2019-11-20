import {
  DATA_UPDATE_ONE_UPDATE,
} from '../features/data/redux/constants';

export function propagateModel(type, model) {
  return (dispatch) => {
    switch (type) {
      case 'FreeAsso_Data':
        dispatch({
          type: DATA_UPDATE_ONE_UPDATE,
          data: model
        });
        break;
    }
  }
}
