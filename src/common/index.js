import moment from 'moment';

export {initAxios as initAxios} from './init';
export {buildModel as buildModel} from './reduxModel';
export {buildFirstModel as buildFirstModel} from './reduxModel';
export {jsonApiNormalizer as jsonApiNormalizer} from './jsonApiNormalizer';
export {jsonApiUpdate as jsonApiUpdate} from './jsonApiNormalizer';
export {getJsonApi as getJsonApi} from './jsonApiNormalizer';
export {addRelationships as addRelationships} from './jsonApiNormalizer';
export {getJsonApiWithRelationships as getJsonApiWithRelationships} from './jsonApiNormalizer';
export {getFieldError as getFieldError} from './jsonApiNormalizer';
export {default as getFieldErrorMessage} from './errorNormalizer';

/**/
export {propagateModel as propagateModel} from './update';

/**/

export function monthAsString(moment) {
  switch (moment.month()+1) {
    case 1: return 'janvier';
    case 2: return 'fevrier';
    case 3: return 'mars';
    case 4: return 'avril';
    case 5: return 'mai';
    case 6: return 'juin';
    case 7: return 'juillet';
    case 8: return 'aout';
    case 9: return 'septembre';
    case 10: return 'octobre';
    case 11: return 'novembre';
    case 12: return 'decembre';
  }
  return '';
}

export function dayAsString(moment) {
  switch (moment.day()) {
    case 0: return 'dimanche';
    case 1: return 'lundi';
    case 2: return 'mardi';
    case 3: return 'mercredi';
    case 4: return 'jeudi';
    case 5: return 'vendredi';
    case 6: return 'samedi';
  }
  return '';
}

export function todayAsDate() {
  let today = new moment().format("YYYY-MM-DD");
  return today;
}

export function dateAsMoment(date, djour) {
  if (date && date != '' && date != '0000-00-00') {
    return moment(date,"YYYY-MM-DD");
  } else {
    if (djour) {
      return moment()
    } else {
      return ''
    }
  }
}

export function momentAsDate(date) {
  if (date) {
    return date.format("YYYY-MM-DD");
  }
  return null;
}

export function canUseDOM() {
  return
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  ;
};

export function queryStringToObject (search = '') {
  if (search.indexOf('?') >= 0) {
    let params = {};
    const hashes = search.slice(search.indexOf('?') + 1).split('&');
    hashes.forEach((hash) => {
      const oneParam = hash.split('=');
      params[oneParam[0]] = decodeURIComponent(oneParam[1]);
    })
    return params;
  }
  return {};
};

export function objectToQueryString (obj) {
  let params = '';
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    let vals = obj[key];
    if (Array.isArray(vals)) {
      for (let key2 in vals) {
          let val2 = vals[key2];
          if (params == '') {
            params = key + '[' + key2 + ']=' + val2;
          } else {
            params = params + '&' + key + '[' + key2 + ']=' + val2;
          }
      }
    } else {
      if (typeof vals == 'object') {
        const keys2 = Object.keys(vals);
        keys2.forEach((key3) => {
          let val3 = vals[key3];
          if (params == '') {
            params = key + '[' + key3 + ']=' + val3
          } else {
            params = params + '&' + key + '[' + key3 + ']=' + val3;
          }
        });
      } else {
        if (params == '') {
          params = key + '=' + vals;
        } else {
          params = params + '&' + key + '=' + vals;
        }
      }
    }
  });
  if (params !== '') {
    params = '?' + params;
  }
  return params;
}
