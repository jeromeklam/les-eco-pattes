import { normalizedObjectModeler } from 'jsonapi-tools';

/**
 * Export all countries as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function countryAsOptions(object) {
  let arr = [];
  if (object) {
    let items = normalizedObjectModeler(
      object,
      'FreeFW_Country',
    );
    items.forEach((item) => {
      arr.push({value: item.id, label: item.cnty_name});
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
  }
  return arr;
}