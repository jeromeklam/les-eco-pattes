import { objectToQueryString, jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getAlerts = (obj_name, obj_id) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        alert_object_name: {eq: obj_name},
        alert_object_id: {eq: obj_id},
      },
      sort: '-alert_from'
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/core/alert' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeFW_Alert');
          resolve(models);
        } else {
          resolve([]);
        }
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};

export const getAlertRecur = (alert) => {
  let alertRecur = 'Tâche à effectuer tous les ';
  if (alert.alert_recur_number > 1) {
    alertRecur = alertRecur + (alert.alert_recur_number);
  }
  switch (alert.alert_recur_type) {
    case 'NONE':
      alertRecur = '';
      break;
    case 'DAY':
      alertRecur = alertRecur + ' jours';
      break;
    case 'MONTH':
      alertRecur = alertRecur + ' mois';
      break;
    case 'YEAR':
      alertRecur = alertRecur + ' ans';
      break;
    case 'HOUR':
      alertRecur = alertRecur + ' heures';
      break;
    case 'MINUTE':
      alertRecur = alertRecur + ' minutes';
      break;
    default:
      alertRecur = '';
      break;
  }
  return alertRecur;
}