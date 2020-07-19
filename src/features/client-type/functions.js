import { buildModel } from 'freejsonapi';

/**
 * Export all client types as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function clientTypeAsOptions(object, restrictedCodes = []) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_ClientType',
  );
  items.forEach((item) => {
    const idx = restrictedCodes.indexOf(item.clit_code);
    if (restrictedCodes.length === 0 || idx >= 0) {
      arr.push({value: item.id, label: item.clit_name});
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