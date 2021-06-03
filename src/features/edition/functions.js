import { getNewJsonApi } from 'jsonapi-front';
import mime from 'mime-types';
import { downloadBlob, showErrors } from '../ui';
import { freeAssoApi } from '../../common';

/**
 * Get object types
 *
 * @return Array
 */
export const getEditionObjectTypes = intl => {
  return [
    { value: 'IMPRESS', label: 'Office Impress' },
    { value: 'WRITER', label: 'Office Writer' },
    { value: 'CALC', label: 'Office Calc' },
    { value: 'HTML', label: 'Html' },
  ];
};

/**
 * Get object modes
 *
 * @return Array
 */
export const getEditionObjectModes = intl => {
  return [
    { value: 'RENEW', label: 'Ré édition' },
    { value: 'KEEP', label: 'Conservation' },
    { value: 'OTHER', label: 'Autre' },
  ];
};

/**
 * Get object names
 *
 * @return Array
 */
export const getEditionObjectNames = intl => {
  return [
    { value: 'FreeAsso_Site', label: 'Sites' },
    { value: 'FreeAsso_Cause', label: 'Animaux' },
    { value: 'FreeAsso_Contract', label: 'Contrats' },
    { value: 'FreeAsso_Movement', label: 'Mouvement' },
  ];
};

/**
 * Retourne la liste des éditions d'un type d'object
 *
 * @param [FreeFW_Edition] p_editions
 * @param string         p_object_name
 *
 * @return [FreeW_Edition]
 */
export const getEditions = (p_editions, p_object_name) => {
  return p_editions.filter(
    elem => elem.edi_object_name.toLowerCase() === p_object_name.toLowerCase(),
  );
};

/**
 * Lancement d'une édition
 *
 * @param object intl
 * @param string p_ediId
 * @param string p_object
 * @param mixed  p_ids
 */
export const printEdition = (intl, p_ediId, p_object, $p_ids) => {
  let obj = {};
  if (Array.isArray($p_ids)) {
    obj = getNewJsonApi(p_object);
  } else {
    obj = getNewJsonApi(p_object, $p_ids);
  }
  const doRequest = freeAssoApi.post('/v1/core/edition/print/' + p_ediId, obj, {
    responseType: 'arraybuffer',
  });
  doRequest.then(
    result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const extension = mime.extension(type);
      downloadBlob(result.data, type, p_object + '_' + $p_ids + '.' + extension);
    },
    err => {
      showErrors(intl, err);
    },
  );
};
