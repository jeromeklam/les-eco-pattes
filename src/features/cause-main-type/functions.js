import { buildModel } from 'freejsonapi';

/**
 * Export all cause main types as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function causeMainTypeAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_CauseMainType',
  );
  items.forEach((item) => {
    arr.push({value: item.id, label: item.camt_name});
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