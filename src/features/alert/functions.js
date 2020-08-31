import { objectToQueryString, jsonApiNormalizer, normalizedObjectModeler } from 'freejsonapi';
import { freeAssoApi, intlDateTime } from '../../common';

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
  let alertRecur = 'Tâche à effectuer ';
  let period = '';
  if (alert.alert_recur_number > 1) {
    period = ' ' + alert.alert_recur_number;
  }
  switch (alert.alert_recur_type) {
    case 'NONE':
      alertRecur = '';
      break;
    case 'DAY':
      alertRecur = 'tous les' + period + ' jours';
      break;
    case 'MONTH':
      alertRecur = 'tous les' + period + ' mois';
      break;
    case 'YEAR':
      alertRecur = 'tous les' + period + ' ans';
      break;
    case 'HOUR':
      alertRecur = 'toutes les' + period + ' heures';
      break;
    case 'MINUTE':
      alertRecur = 'toutes les' + period + ' minutes';
      break;
    default:
      alertRecur = '';
      break;
  }
  return alertRecur;
}

export const getLibStatus = (done_ts, deadline) => {
  const today = new Date().toISOString();
  let libStatus = "";
  if (done_ts !== "" && done_ts !== null) {
    if (done_ts < today ) {
      libStatus = "effectué le " + intlDateTime(done_ts, true);
    }
  } else {
    if (deadline !== "" && deadline !== null) {
      libStatus = "à faire avant le " + intlDateTime(deadline, true) + " !";
    }
  }
  return libStatus;
}
