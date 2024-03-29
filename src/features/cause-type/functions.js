import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
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
          const model = normalizedObjectModeler(list, 'FreeAsso_CauseType', caut_id, {eager: eager});
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
 * 
 */
export const getCauseTypeLabel = (store, id) => {
  let label = '';
  if (store) {
    let items = normalizedObjectModeler(store, 'FreeAsso_CauseType');
    if (items) {
      const found = items.find(elem => elem.id === id);
      if (found) {
        label = found.caut_name;
      }
    }
  }
  return label;
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
    const items = normalizedObjectModeler(object, 'FreeAsso_CauseType');
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

export function findCauseType(object, id) {
  let elem = null;
  if (object) {
    const items = normalizedObjectModeler(object, 'FreeAsso_CauseType');
    if (Array.isArray(items)) {
      elem = items.find(cType => cType.id === id);
    }
  }
  return elem;
}