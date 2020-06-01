import { buildModel, objectToQueryString, jsonApiNormalizer } from 'freejsonapi';
import { freeAssoApi } from '../../common';

/**
 * 
 */
export const getOne = (id) => {
  if (!id) {
    id = '0';
  }
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/site/' + id, {})
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const model = buildModel(list, 'FreeAsso_Site', id, {eager: true});
          resolve(model);
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
}

/**
 *
 */
export const getMedias = (site_id, sitm_type) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        site_id: site_id,
        sitm_type: sitm_type,
      }
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/site_media' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = buildModel(list, 'FreeAsso_SiteMedia');
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

/**
 *
 */
export const downloadSiteMediaBlob = sitm_id => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/site_media_blob/download/' + sitm_id, {
      responseType: 'arraybuffer',
    });
    doRequest.then(
      res => {
        resolve(res);
      },
      err => {
        reject(err);
      },
    );
  });
  return promise;
};

/**
 * Export all sites as an array of value=>label
 *
 * @param {object} object
 *
 * @return {array}
 */
export const siteAsOptions = object => {
  let arr = [];
  let items = buildModel(object, 'FreeAsso_Site');
  items.forEach(item => {
    arr.push({ value: item.id, label: item.caut_name });
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
  return arr;
};
