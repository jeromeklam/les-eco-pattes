import { buildModel } from '../../common';

/**
 * Export all sites as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function siteAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_Site',
  );
  items.forEach((item) => {
    arr.push({value: item.id, label: item.caut_name});
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