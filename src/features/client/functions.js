import { normalizedObjectModeler, objectToQueryString, jsonApiNormalizer } from 'jsonapi-front';
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

/**
 *
 */
export const getClients = (parent_id, client ) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {}
    };
    filter.filter.parent_cli_id = parent_id;
    const addUrl = objectToQueryString(filter);
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