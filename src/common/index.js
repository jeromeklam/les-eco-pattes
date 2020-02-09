export { default as freeAssoApi } from './api';
export { initAxios } from './init';

/**/
export { propagateModel } from './update';

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
      console.log(ex);
    }
  }
  return '';
}