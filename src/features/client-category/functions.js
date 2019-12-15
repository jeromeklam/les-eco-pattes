import { buildModel } from '../../common';

/**
 * Export all clientcategories as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function clientCategoryAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_ClientCategory',
  );
  items.forEach((item) => {
    arr.push({value: item.id, label: item.clic_name});
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