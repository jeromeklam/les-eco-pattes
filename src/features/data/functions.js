import { normalizedObjectModeler } from 'jsonapi-front';

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
  let items = normalizedObjectModeler(object, 'FreeAsso_Data');
  items.forEach(item => {
    if (!item.deleted) {
      arr.push({ value: item.id, label: item.data_name });
    }
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

export function getLabel(model, code, value) {
  let label = '';
  model.forEach(item => {
    if (item.data_code === code) {
      const datas = JSON.parse(item.data_content);
      datas.forEach(item => {
        if (item.value === value) {
          label = item.label;
        }
      });
    }
  });
  return label;
}
