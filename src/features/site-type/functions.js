import { normalizedObjectModeler } from 'jsonapi-front';

/**
 * Export all site types as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export function siteTypeAsOptions(object) {
  let arr = [];
  let items = normalizedObjectModeler(object, 'FreeAsso_SiteType');
  items.forEach(item => {
    arr.push({ value: item.id, label: item.sitt_name });
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
