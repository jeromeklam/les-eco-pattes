import { normalizedObjectModeler, objectToQueryString, jsonApiNormalizer } from 'jsonapi-front';
import axios from 'axios';
import { freeAssoApi } from '../../common';

export function raiserAsOptions(object) {
  let arr = [];
  if (object) {
    let items = normalizedObjectModeler(object, 'FreeAsso_Client');
    if (items) {
      items.forEach(item => {
        arr.push({ value: item.id, label: item.clicaut_name });
      });
      arr.sort(function(a, b) {
        if (a.label > b.label) {
          return 1;
        } else {
          if (a.label < b.label) {
            return -1;
          }
        }
        return 0;
      });
    }
  }
  return arr;
}


export const getFullName = client => {
  let fullname = '';
  if (client && client.cli_lastname) {
    fullname = `${client.cli_lastname} `
    if (client.cli_firstname) {
      fullname += client.cli_firstname;
    }
  }
  return fullname.trim();
};

export const findTypeCode = (id, types) => {
  if (!types) {
    return '';
  }
  let code = '';
  types.forEach(elem => {
    if (elem.id === id) {
      code = elem.clit_code;
      return true;
    }
  });
  return code;
};

export const findCategoryCode = (id, categories) => {
  if (!categories) {
    return '';
  }
  let code = '';
  categories.forEach(elem => {
    if (elem.id === id) {
      code = elem.clic_code;
      return true;
    }
  });
  return code;
};
/**
 *
 */
export const getClients = ( parent_id ) => {
  const promise = new Promise((resolve, reject) => {
    const params = {
      filter: { 'parent_client.id' : {eq : parent_id}}
    };
    const addUrl = objectToQueryString(params);
    const doRequest = freeAssoApi.get('/v1/asso/client' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeAsso_Client');
          resolve(models);
        } else {
          resolve([]);
        }
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};

let clientCancelToken = null;

export const searchClient = search => {
  const promise = new Promise((resolve, reject) => {
    if (clientCancelToken) {
      clientCancelToken.cancel();
    }
    clientCancelToken = axios.CancelToken.source();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    const doRequest = freeAssoApi.get(
      process.env.REACT_APP_BO_URL + '/v1/asso/client/autocomplete/' + search,
      {
        headers: headers,
        cancelToken: clientCancelToken.token,
      },
    );
    doRequest.then(
      res => {
        let list = [];
        if (res.data && res.data.length > 0) {
          res.data.map(item =>
            list.push({ item: item }),
          );
        }
        resolve(list);
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};