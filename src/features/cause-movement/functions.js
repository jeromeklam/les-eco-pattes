import { buildModel, objectToQueryString, jsonApiNormalizer } from 'freejsonapi';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getMovements = (cau_id = null, move_id = null) => {
  const promise = new Promise((resolve, reject) => {
    let filter = {
      filter: {},
      sort: '-camv_ts'
    }
    if (cau_id) {
      filter.filter.cau_id = cau_id;
    }
    if (move_id) {
      filter.filter.move_id = move_id;
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/cause_movement' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = buildModel(list, 'FreeAsso_CauseMovement');
          resolve(models);
        } else {
          resolve([]);
        }
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};

/**
 * 
 */
export const statusLabel = (code) => {
  switch (code) {
    case 'OK': {
      return 'Effectué';
    }
    case 'WAIT': {
      return 'A valider';
    }
    default: {
      return 'Autre';
    }
  }
};