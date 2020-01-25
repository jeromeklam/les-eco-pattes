export { default as freeAssoApi } from './api';
export { initAxios } from './init';

/**/
export { propagateModel } from './update';

export function isInViewPort(el, threshold) {
  threshold = threshold || 0;

  var rect = el.getBoundingClientRect();
  var height = (rect.height || el.clientHeight || 0) + threshold;
  var width = (rect.width || el.clientWidth || 0) + threshold;

  return (
    rect.top >= -height &&
    rect.left >= -width &&
    rect.bottom <= height + window.innerHeight &&
    rect.right <= width + window.innerWidth
  );
}

export function queryStringToObject(search = '') {
  if (search.indexOf('?') >= 0) {
    let params = {};
    const hashes = search.slice(search.indexOf('?') + 1).split('&');
    hashes.forEach(hash => {
      const oneParam = hash.split('=');
      params[oneParam[0]] = decodeURIComponent(oneParam[1]);
    });
    return params;
  }
  return {};
}

export function objectToQueryString(obj) {
  let params = '';
  const keys = Object.keys(obj);
  keys.forEach(key => {
    let vals = obj[key];
    if (Array.isArray(vals)) {
      for (let key2 in vals) {
        let val2 = vals[key2];
        if (typeof val2 === 'object') {
          const keys21 = Object.keys(val2);
          keys21.forEach(key21 => {
            let val21 = val2[key21];
            if (params === '') {
              params = key + '[' + key2 + '][' + key21 + ']=' + val21;
            } else {
              params = params + '&' + key + '[' + key2 + '][' + key21 + ']=' + val21;
            }
          });
        } else {
          if (params === '') {
            params = key + '[' + key2 + ']=' + val2;
          } else {
            params = params + '&' + key + '[' + key2 + ']=' + val2;
          }
        }
      }
    } else {
      if (typeof vals === 'object') {
        const keys2 = Object.keys(vals);
        keys2.forEach(key3 => {
          let val3 = vals[key3];
          if (typeof val3 === 'object') {
            const keys31 = Object.keys(val3);
            keys31.forEach(key31 => {
              let val31 = val3[key31];
              if (params === '') {
                params = key + '[' + key3 + '][' + key31 + ']=' + val31;
              } else {
                params = params + '&' + key + '[' + key3 + '][' + key31 + ']=' + val31;
              }
            });
          } else {
            if (params === '') {
              params = key + '[' + key3 + ']=' + val3;
            } else {
              params = params + '&' + key + '[' + key3 + ']=' + val3;
            }
          }
        });
      } else {
        if (params === '') {
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

export function getObjectmemberValue(obj, member) {
  const elems = member.split('.');
  let value = obj;
  while (elems.length > 0) {
    let mb = elems.shift();
    if (value.hasOwnProperty(mb)) {
      value = value[mb];
    } else {
      return null;
    }
  }
  return value;
}

export function modelsToSelect(models, value, label) {
  let arr = [];
  const ME = models.MAINELEM;
  const elems = models[ME];
  if (elems) {
    Object.keys(elems).forEach(oneKey => {
      const oneElem = elems[oneKey];
      arr.push({ value: oneElem.id, label: oneElem.attributes[label] });
    });
  }
  return arr;
}

export function getPreviousNext(items, id) {
  let ret = {prev : null, next : null};
  if (items.SORTEDELEMS) {
    const idx = items.SORTEDELEMS.findIndex(elt => elt === id);
    if (idx > 0) {
      ret.prev = items.SORTEDELEMS[idx-1]
    }
    if (idx < items.SORTEDELEMS.length) {
      ret.next = items.SORTEDELEMS[idx+1]
    }
  }
  return ret;
}