export function propagateModel(type, model) {
  return dispatch => {
    switch (type) {
      case 'FreeAsso_Site':
        dispatch({
          type: '',
          model: model
        });
        break;
    }
  }
}
