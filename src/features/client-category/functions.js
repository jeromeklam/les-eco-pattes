import { normalizedObjectModeler } from 'jsonapi-tools';

/**
 * Export all clientcategories as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function clientCategoryAsOptions(object, restrictedCodes = []) {
  let arr   = [];
  let items = normalizedObjectModeler(
    object,
    'FreeAsso_ClientCategory',
  );
  items.forEach((item) => {
    if (restrictedCodes.length === 0 || restrictedCodes.indexOf(elem => {console.log(elem); return elem === item.clic_code}) >= 0) {
      arr.push({value: item.id, label: item.clic_name});
    }
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