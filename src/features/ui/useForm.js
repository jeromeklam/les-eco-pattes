import { useState } from 'react';
import { freeAssoApi } from '../../common';
import { jsonApiNormalizer, buildModel } from 'freejsonapi';

const explodeReduxModel = obj => {
  let ret = { ...obj };
  return ret;
};

const _loadCauseType = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause_type/' + id, {});
};

const _loadSiteType = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/site_type/' + id, {});
};

const _loadSickness = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/sickness/' + id, {});
};

const _loadSite = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/site/' + id, {});
};

const _loadCause = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause/' + id, {});
};

const _loadClient = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/client/' + id, {});
};

const useForm = (initialState, initialTab, onSubmit, onCancel, onNavTab, errors) => {
  const [values, setValues] = useState({
    ...initialState,
    currentTab: initialTab,
    loadCauseType: false,
    loadSiteType: false,
    loadClient: false,
    loadCause: false,
    loadSite: false,
    loadSickness: false,
    errors: errors,
  });

  const handleSubmit = event => {
    if (event) event.preventDefault();
    onSubmit(values);
  };

  const handleChange = event => {
    if (event && event.persist) {
      event.persist();
    }
    let tType = event.target.type || 'text';
    const tName = event.target.name;
    const elems = tName.split('.');
    const first = elems.shift();
    let datas = null;
    if (elems.length <= 0) {
      switch (tType) {
        case 'checkbox':
          datas = event.target.checked || false;
          values[first] = datas;
          break;
        case 'FreeAsso_Cause':
          if (!values.loadCause) {
            const id = event.target.value || '0';
            values.loadCause = true;
            setValues(explodeReduxModel(values));
            _loadCause(id)
              .then(result => {
                values.loadCause = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Cause', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadCause = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Client':
          if (!values.loadClient) {
            const id = event.target.value || '0';
            values.loadClient = true;
            setValues(explodeReduxModel(values));
            _loadClient(id)
              .then(result => {
                values.loadClient = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Client', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadClient = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Site':
          if (!values.loadSite) {
            const id = event.target.value || '0';
            values.loadSite = true;
            setValues(explodeReduxModel(values));
            _loadSite(id)
              .then(result => {
                values.loadSite = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Site', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSite = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Sickness':
          if (!values.loadSickness) {
            const id = event.target.value || '0';
            values.loadSickness = true;
            setValues(explodeReduxModel(values));
            _loadSickness(id)
              .then(result => {
                values.loadSickness = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Sickness', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSickness = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        default:
          datas = event.target.value;
          values[first] = datas;
          break;
      }
    } else {
      datas = values[first];
      if (datas.id !== undefined && datas.type) {
        tType = datas.type;
      }
      const second = elems.shift();
      switch (tType) {
        case 'checkbox':
          datas[second] = event.target.checked || false;
          values[first] = datas;
          break;
        case 'FreeAsso_CauseType':
          if (!values.loadCauseType) {
            const id = event.target.value || '0';
            values.loadCauseType = true;
            setValues(explodeReduxModel(values));
            _loadCauseType(id)
              .then(result => {
                values.loadCauseType = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_CauseType', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadCauseType = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_SiteType':
          if (!values.loadSiteType) {
            const id = event.target.value || '0';
            values.loadSiteType = true;
            setValues(explodeReduxModel(values));
            _loadSiteType(id)
              .then(result => {
                values.loadSiteType = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_SiteType', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSiteType = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Cause':
          if (!values.loadCause) {
            const id = event.target.value || '0';
            values.loadCause = true;
            setValues(explodeReduxModel(values));
            _loadCause(id)
              .then(result => {
                values.loadCause = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Cause', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadCause = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Client':
          if (!values.loadClient) {
            const id = event.target.value || '0';
            values.loadClient = true;
            setValues(explodeReduxModel(values));
            _loadClient(id)
              .then(result => {
                values.loadClient = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Client', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadClient = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Site':
          if (!values.loadSite) {
            const id = event.target.value || '0';
            values.loadSite = true;
            setValues(explodeReduxModel(values));
            _loadSite(id)
              .then(result => {
                values.loadSite = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Site', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSite = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Sickness':
          if (!values.loadSickness) {
            const id = event.target.value || '0';
            values.loadSickness = true;
            setValues(explodeReduxModel(values));
            _loadSickness(id)
              .then(result => {
                values.loadSickness = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = buildModel(lines, 'FreeAsso_Sickness', id, { eager: true });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSickness = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        default:
          datas[second] = event.target.value;
          values[first] = datas;
          break;
      }
    }
    setValues(explodeReduxModel(values));
  };

  const handleCancel = event => {
    if (event) event.preventDefault();
    onCancel();
  };

  const handleNavTab = keyTab => {
    setValues({ ...values, currentTab: keyTab });
  };

  const getErrorMessage = field => {
    let message = false;
    if (errors && errors.errors) {
      errors.errors.forEach(error => {
        if (error.source && error.source.parameter === field) {
          if (error.code === 666001) {
            message = 'Le champ est obligatoire !';
          } else {
            message = error.title;
          }
          return true;
        }
      })
    }
    return message;
  }

  return {
    values,
    handleChange,
    handleSubmit,
    handleCancel,
    handleNavTab,
    getErrorMessage,
  };
};

export default useForm;
