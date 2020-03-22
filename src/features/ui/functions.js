import cogoToast from 'cogo-toast';

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

export const showErrors = (intl, error) => {
  if (error && error.errors) {
    error.errors.forEach((oneError) => {
      if (oneError.code) {
        const code = `app.errors.code.${oneError.code}`;
        const message = intl.formatMessage({
          id: code,
          defaultMessage: oneError.title,
        });
        cogoToast.error(message);
      }
    });
  }
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
