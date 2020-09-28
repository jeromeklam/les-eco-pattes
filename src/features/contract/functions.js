import { normalizedObjectModeler, objectToQueryString, jsonApiNormalizer } from 'jsonapi-front';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getMedias = (contract_id) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        ct_id: {eq: contract_id},
      }
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/contract_media' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeAsso_ContractMedia');
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
export const downloadContractMediaBlob = caum_id => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/contract_media_blob/download/' + caum_id, {
      responseType: 'arraybuffer',
    });
    doRequest.then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};
