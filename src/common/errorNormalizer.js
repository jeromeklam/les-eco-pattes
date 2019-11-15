import camelCase from 'lodash/camelCase';
import isArray from 'lodash/isArray';
import isNull from 'lodash/isNull';
import keys from 'lodash/keys';
import merge from 'lodash/merge';

export default function getFieldErrorMessage(errors, fieldName, messdef='Erreur inconnue') {
  let ret = false;
  if (errors && errors.errors) {
    const list = errors.errors;
    list.map((elem) => {
      if (elem.meta && elem.meta.field && elem.meta.field == fieldName) {
        if (elem.title) {
          if (elem.title == '') {
            ret = messdef;
          } else {
            ret = elem.title;
          }
        }
      }
    })
  }
  return ret;
}
