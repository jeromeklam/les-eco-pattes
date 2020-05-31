export { default as freeAssoApi } from './api';
export { initAxios } from './init';
export * from './socket';

/**/
export { propagateModel, propagateCreate, propagateUpdate, propagateDelete } from './update';

export const setModelValue = (model, key, value) => {
  const parts = key.split('.');
  switch (parts.length) {
    case 4: {
      model[parts[0]][parts[1]][parts[2]][parts[3]] = value;
      break;
    }
    case 3: {
      model[parts[0]][parts[1]][parts[2]] = value;
      break;
    }
    case 2: {
      model[parts[0]][parts[1]] = value;
      break;
    }
    default: {
      model[key] = value;
      break;
    }
  }
}

export const validateRegex = (value, regex) => {
  if (regex !== '') {
    try {
      const myRegex = new RegExp(regex, 'i');
      return myRegex.test(value);
    } catch (ex) {}
  }
  return true;
}

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
    arr.sort(function(a, b) {
      if (a.label.toUpperCase() > b.label.toUpperCase()) {
        return 1;
      } else {
        if (a.label.toUpperCase() < b.label.toUpperCase()) {
          return -1;
        }
      }
      return 0;
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

export function intlDate(date) {
  if (date) {
    try {
      const laDate = new Date(date);
      return new Intl.DateTimeFormat('fr-FR').format(laDate);
    } catch (ex) {
      // @TODO
    }
  }
  return '';
}