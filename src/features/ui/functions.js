import cogoToast from 'cogo-toast';

export const createSuccess = (message = null) => {
  cogoToast.success(message ? message : "Création effectuée");
}

export const createError = (message = null) => {
  cogoToast.error(message ? message : "Erreur lors de la création !");
}

export const modifySuccess = (message = null) => {
  cogoToast.success(message ? message : "Enregistrement effectué");
}

export const modifyError = (message = null) => {
  cogoToast.error(message ? message : "Erreur lors de l'enregistrement !");
}

export const deleteSuccess = (message = null) => {
  cogoToast.success(message ? message : "Suppression effectuée");
}

export const deleteError = (message = null) => {
  cogoToast.error(message ? message : "Erreur lors de la suppression ! !");
}