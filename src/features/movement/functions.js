import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getOneMovement = id => {
  return freeAssoApi.get('/v1/asso/movement/' + id);
};

/**
 * 
 */
export const getOneCauseAsModel = id => {
  return new Promise((resolve, reject) => {
    getOneMovement(id).then(
      res => {
        const object = jsonApiNormalizer(res.data);
        const item = normalizedObjectModeler(object, 'FreeAsso_Movement', id, { eager: true });
        resolve(item);
      },
      err => {
        reject(err);
      },
    );
  });
};

