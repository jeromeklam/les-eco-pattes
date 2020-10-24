import cogoToast from 'cogo-toast';
import { jsonApiNormalizer } from 'jsonapi-front';

export const isNull = value => {
  let ret = true ;
  if (value > 0) {
    ret = false;
  }
  return ret;
}

export const isEmpty = value => {
  let ret = false ;
  if (value == null || value === "") {
    ret = true;
  }
  return ret;
}

export const isNotEmpty = value => {
  let ret = false ;
  if (value != null || value !== "") {
    ret = true;
  }
  return ret;
}

export const getFromLS = key => {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem('rgl-8')) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
};

export const saveToLS = (key, value) => {
  if (global.localStorage) {
    global.localStorage.setItem(
      'rgl-8',
      JSON.stringify({
        [key]: value,
      }),
    );
  }
};

export const getFieldError = (intl, field, errors) => {
    let message = false;

    if (errors && errors.errors) {
      errors.errors.forEach(error => {
        if (error.source && error.source.parameter === field) {
          if (intl) {
            message = intl.formatMessage({ id: 'app.errors.code.' + error.code, defaultMessage: 'Unknown error ' + error.code });
          }
          return true;
        }
      });
    }
    return message;
};

export function showErrors(intl, error, defCode = "", firstMess = "") {
  if (error) {
    if (!error.errors) {
      if (error.response) {
        error = jsonApiNormalizer(error.response);
      }
    }
    if (error.errors) {
      let nbErrorField = 0;
      let displayDefaultError = true;  
      error.errors.forEach(oneError => {
        if (oneError.source && oneError.source.parameter && oneError.source.parameter !== "") {
          nbErrorField += 1;
        } else {
          displayDefaultError = false;
          if (oneError.code) {
            const code = `app.errors.code.${oneError.code}`;
            const message = firstMess + intl.formatMessage({
              id: code,
              defaultMessage: oneError.title,
            });
            cogoToast.error(message);
          } else {
            if (oneError.status) {
              const code = `app.errors.code.${oneError.status}`;
              const message = firstMess +  intl.formatMessage({
                id: code,
                defaultMessage: oneError.title,
              });
              cogoToast.error(message);
            }
          }
        }
      });
      if (displayDefaultError) {
        const message = firstMess +  intl.formatMessage({
          id: `app.errors.default.${defCode}`,
          defaultMessage: 'Unknown error !',
        });
        cogoToast.error(message);
      } 
    } else {
      const message = firstMess +  intl.formatMessage({
        id: 'app.errors.default',
        defaultMessage: 'Unknown error !',
      });
      cogoToast.error(message);
    }
  } else {
    const message = firstMess + intl.formatMessage({
      id: 'app.errors.default',
      defaultMessage: 'Unknown error !',
    });
    cogoToast.error(message);
  }
}

export const getFieldErrorMessage = (intl, errors, field) => {
  let message = false;
  if (errors && errors.errors) {
    errors.errors.forEach(error => {
      if (error.source && error.source.parameter === field) {
        if (error.source && error.source.parameter === field) {
          message = intl.formatMessage({ id: 'app.errors.code.' + error.code, defaultMessage: 'Unknown error ' + error.code });
          return true;
        }
      }
    })
  }
  return message;
};

export const messageError = (message = 'Unknown error') => {
  cogoToast.error(message);
};

export const messageSuccess = (message = 'Ok') => {
  cogoToast.success(message);
};

export const createSuccess = (message = null) => {
  cogoToast.success(message ? message : 'Création effectuée');
};

export const createError = (message = null) => {
  cogoToast.error(message ? message : 'Erreur lors de la création !');
};

export const modifySuccess = (message = null) => {
  cogoToast.success(message ? message : 'Enregistrement effectué');
};

export const modifyError = (message = null) => {
  cogoToast.error(message ? message : "Erreur lors de l'enregistrement !");
};

export const deleteSuccess = (message = null) => {
  cogoToast.success(message ? message : 'Suppression effectuée');
};

export const deleteError = (message = null) => {
  cogoToast.error(message ? message : 'Erreur lors de la suppression ! !');
};

export const downloadBlob = (data, type, filename) => {
  const bytes = new Uint8Array(data); 
  const blob = new Blob([bytes], {type: type});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  const clickHandler = () => {
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };
  a.addEventListener('click', clickHandler, false);
  a.click();
  return a;
}
