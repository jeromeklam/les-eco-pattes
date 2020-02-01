import { buildModel } from 'freejsonapi';

/**
 * Export all data types as an array of value=>label
 */
export function dataTypes() {
  let arr = [
    { value: 'BOOLEAN', label: 'Booléen' },
    { value: 'DATE', label: 'Date' },
    { value: 'STRING', label: 'Chaine' },
    { value: 'LIST', label: 'Liste' },
    { value: 'NUMBER', label: 'Nombre' },
    { value: 'DATETIME', label: 'Date/Heure' },
  ];
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

/**
 * Export all site types as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function dataAsOptions(object) {
  let arr = [];
  let items = buildModel(object, 'FreeAsso_Data');
  items.forEach(item => {
    arr.push({ value: item.id, label: item.data_name });
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
