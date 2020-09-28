import { objectToQueryString, jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getGrowths = (cau_id) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        cau_id: {eq : cau_id},
      },
      sort: '-grow_ts'
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/cause_growth' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeAsso_CauseGrowth');
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
