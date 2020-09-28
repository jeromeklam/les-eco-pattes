import { objectToQueryString, jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi } from '../../common';
/**
 *
 */
export const getSicknesses = (cau_id) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        cau_id: {eq: cau_id},
      },
      sort: '-caus_from'
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/cause_sickness' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeAsso_CauseSickness');
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
