import { jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';

/**
 * Export all site types as an array of value=>label
 * 
 * @param {object} object
 * 
 * @return {array}
 */
export function configAsOptions(object) {  
  let arr   = [];
  let items = normalizedObjectModeler(
    object,
    'FreeAsso_Config',
  );
  return arr;
}jsonapi