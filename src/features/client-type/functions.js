import { buildModel } from '../../common';

/**
 * Export all client types as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function clientTypeAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_ClientType',
  );
  items.forEach((item) => {
    arr.push({value: item.id, label: item.clit_name});
  });
  arr.sort(function (a, b) {
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