import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

export default function getFieldErrorMessage(errors, fieldName, messdef='') {
  let ret = messdef;
  if (errors && errors.errors) {
    const list = errors.errors;
    list.forEach((elem) => {
      if (elem.source && elem.source.pointer) {
        if (elem.source.pointer.indexOf( '/' + fieldName) >= 0) {
          if (elem.title) {
            if (elem.title === '') {
              ret = 'Erreur inconnue';
            } else {
              ret = elem.title;
            }
          }
        }
        return true;
      }
    })
  }
  return ret;
}
