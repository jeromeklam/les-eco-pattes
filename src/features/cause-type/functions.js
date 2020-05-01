import { buildModel } from 'freejsonapi';

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
 * Export all cause types as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function causeTypeAsOptions(object) {
  let arr = [];
  let items = buildModel(object, 'FreeAsso_CauseType');
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
  return arr;
}
