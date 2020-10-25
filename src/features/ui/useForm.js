import { useState } from 'react';
import { jsonApiNormalizer, normalizedObjectModeler } from 'jsonapi-front';
import { freeAssoApi } from '../../common';

const explodeReduxModel = obj => {
  let ret = { ...obj };
  return ret;
};

const _loadUser = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/sso/user/' + id + '?include=', {});
};

const _loadCauseType = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause_type/' + id + '?include=', {});
};

const _loadSiteType = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/site_type/' + id + '?include=', {});
};

const _loadSickness = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/sickness/' + id + '?include=', {});
};

const _loadSite = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/site/' + id + '?include=site_type,parent_site', {});
};

const _loadCause = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/cause/' + id + '?include=cause_type,site,parent1,parent2', {});
};

const _loadClient = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get(
    '/v1/asso/client/' + id + '?include=lang,country,client_category,client_type',
    {},
  );
};

const _loadContract = id => {
  if (!id) {
    id = '0';
  }
  return freeAssoApi.get('/v1/asso/contract/' + id + '?include=', {});
};

const useForm = (
  initialState,
  initialTab,
  onSubmit,
  onCancel,
  onNavTab,
  errors,
  intl = null,
  afterChange = null,
  init = null,
) => {
  const initial = init ? init(initialState) : initialState;
  const [values, setValues] = useState({
    ...initial,
    currentTab: initialTab,
    loadCauseType: false,
    loadSiteType: false,
    loadClient: false,
    loadContract: false,
    loadCause: false,
    loadSite: false,
    loadUser: false,
    loadSickness: false,
    errors: errors,
    sending: false,
  });

  const handleChange = event => {
    if (event && event.persist) {
      event.persist();
    }
    values.sending = false;
    let tType = event.target.dataset && event.target.dataset.type ? event.target.dataset.type : '';
    if (tType === '') {
      tType = event.target.type || 'text';
    }
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
        case 'FreeSSO_User':
          if (!values.loadUser) {
            const id = event.target.value || '0';
            values.loadUser = true;
            setValues(explodeReduxModel(values));
            _loadUser(id)
              .then(result => {
                values.loadUser = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = normalizedObjectModeler(lines, 'FreeSSO_User', id, {
                    eager: true,
                  });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                }
              })
              .catch(err => {
                values.loadUser = false;
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Cause', id, {
                    eager: true,
                  });
                  values[first] = item;
                  setValues(explodeReduxModel(values));
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Client', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadClient = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Contract':
          if (!values.loadContract) {
            const id = event.target.value || '0';
            values.loadContract = true;
            setValues(explodeReduxModel(values));
            _loadContract(id)
              .then(result => {
                values.loadContract = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Contract', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadContract = false;
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_SiteType', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadSiteType = false;
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Site', id, { eager: true });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Sickness', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
          if (afterChange) {
            afterChange(event.target.name, values);
          }
          break;
      }
    } else {
      datas = values[first];
      if (!datas) {
        datas = {};
        tType = event.target.dataset && event.target.dataset.type ? event.target.dataset.type : '';
      }
      if (datas.id !== undefined && datas.type) {
        tType = datas.type;
      }
      const second = elems.shift();
      switch (tType) {
        case 'checkbox':
          datas[second] = event.target.checked || false;
          values[first] = datas;
          break;
        case 'FreeSSO_User':
          if (!values.loadUser) {
            const id = event.target.value || '0';
            values.loadUser = true;
            setValues(explodeReduxModel(values));
            _loadUser(id)
              .then(result => {
                values.loadUser = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = normalizedObjectModeler(lines, 'FreeSSO_User', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadUser = false;
                setValues(explodeReduxModel(values));
              });
          }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_CauseType', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_SiteType', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Cause', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Client', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadClient = false;
                setValues(explodeReduxModel(values));
              });
          }
          break;
        case 'FreeAsso_Contract':
          if (!values.loadContract) {
            const id = event.target.value || '0';
            values.loadContract = true;
            setValues(explodeReduxModel(values));
            _loadContract(id)
              .then(result => {
                values.loadContract = false;
                if (result && result.data) {
                  const lines = jsonApiNormalizer(result.data);
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Contract', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
                  setValues(explodeReduxModel(values));
                }
              })
              .catch(err => {
                values.loadContract = false;
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Site', id, { eager: true });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
                  const item = normalizedObjectModeler(lines, 'FreeAsso_Sickness', id, {
                    eager: true,
                  });
                  values[first] = item;
                  if (afterChange) {
                    afterChange(event.target.name, values);
                  }
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
          if (afterChange) {
            afterChange(event.target.name, values);
          }
          break;
      }
    }
    setValues(explodeReduxModel(values));
  };

  const handleSubmit = event => {
    if (!values.sending) {
      //values.sending = true;
      setValues(explodeReduxModel(values));
      if (event) event.preventDefault();
      onSubmit(values);
    }
  };

  const handleCancel = event => {
    if (!values.sending) {
      //values.sending = true;
      setValues(explodeReduxModel(values));
      if (event) event.preventDefault();
      onCancel();
    }
  };

  const handleNavTab = keyTab => {
    setValues({ ...values, currentTab: keyTab });
  };

  const getErrorMessage = field => {
    //const intl = useIntl();
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
