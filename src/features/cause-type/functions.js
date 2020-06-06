import { buildModel, objectToQueryString, jsonApiNormalizer } from 'freejsonapi';
import { freeAssoApi } from '../../common';

export const causeTypeMntType = [
  { value: 'ANNUAL', label: 'Annuelle glissante' },
  { value: 'MAXIMUM', label: 'Objectif' },
  { value: 'OTHER', label: 'Aucune' },
];

export const causeTypeFamily = [
  { value: 'ANIMAL', label: 'Animal' },
  { value: 'NATURE', label: 'Nature' },
  { value: 'ADMINISTRATIV', label: 'Association' },
  { value: 'OTHER', label: 'Autre' },
];

/**
 * 
 */
export const getCauseType = (caut_id, eager = true) => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/cause_type/' + caut_id, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list  = jsonApiNormalizer(res.data);
          const model = buildModel(list, 'FreeAsso_CauseType', caut_id, {eager: eager});
          resolve(model);
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
}

/**
 * Export all cause types as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function causeTypeAsOptions(object) {
  let arr = [];
  if (object) {
    let items = buildModel(object, 'FreeAsso_CauseType');
    if (items) {
      items.forEach(item => {
        arr.push({ value: item.id, label: item.caut_name });
      });
      arr.sort(function(a, b) {
        if (a.label > b.label) {
          return 1;
        } else {
          if (a.label < b.label) {
            return -1;
          }
        }
        return 0;
      });
    }
  }
  return arr;
}
