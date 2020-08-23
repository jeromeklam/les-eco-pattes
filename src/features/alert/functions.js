import { objectToQueryString, jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getAlerts = (obj_id) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        alert_object_id: {eq: obj_id},
      },
      sort: '-alert_from'
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeFW_Alert');
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
