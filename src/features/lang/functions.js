import { normalizedObjectModeler } from 'jsonapi-front';

/**
 * Export all langs as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function langAsOptions(object, restrict = []) {
  let arr   = [];
  if (object) {
    let items = normalizedObjectModeler(
      object,
      'FreeFW_Lang',
    );
    if (items) {
      items.forEach((item) => {
        if (restrict.length > 0) {
          if (item.lang_code && restrict.includes(item.lang_code.toLowerCase())) {
            arr.push({value: item.id, label: item.lang_name});
          }
        } else {
          arr.push({value: item.id, label: item.lang_name});
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
    }
  }
  return arr;
}