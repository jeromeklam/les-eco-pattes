import {
  jsonApiNormalizer,
  buildModel
} from '../../common';

/**
 * Export all site types as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function configAsOptions(object) {
  let arr   = [];
  let items = buildModel(
    object,
    'FreeAsso_Config',
  );
  console.log("config items",items);
  return arr;
}