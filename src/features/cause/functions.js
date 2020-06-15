import { buildModel, objectToQueryString, jsonApiNormalizer } from 'freejsonapi';
import { freeAssoApi } from '../../common';

/**
 *
 */
export const getMedias = (cause_id, caum_type) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        cau_id: {eq: cause_id},
        caum_type: {eq: caum_type},
      }
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/cause_media' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = buildModel(list, 'FreeAsso_CauseMedia');
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
export const getCause = (cau_id, eager = true) => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/cause/' + cau_id, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list  = jsonApiNormalizer(res.data);
          const model = buildModel(list, 'FreeAsso_Cause', cau_id, {eager: eager});
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
export const getCauses = (mode, site_id, cause, ids = []) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {}
    };
    if (mode === 'site') {
      filter.filter.site_id = site_id;
    } else {
      if (mode === 'list') {
        filter.filter.cau_id = {in: ids};
      } else {
        if (cause.cau_sex === 'M') {
          filter.filter['parent1.cau_id'] = cause.id;
        } else {
          filter.filter['parent2.cau_id'] = cause.id;
        }
      }
    }
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/cause' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = buildModel(list, 'FreeAsso_Cause');
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
export const downloadCauseMediaBlob = sitm_id => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/cause_media_blob/download/' + sitm_id, {
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
 * Export all cause group
 *
 * @param {causeList} array
 *
 * @return {array}
 */
export function causeGroup(causeList) {
  let causeGroup = [];
  let find;
  let nbGrp = 0 ;
  if ( causeList ) {
    causeList.forEach((item) => {
      find = false;
      causeGroup.forEach((group) => {
        if (item.cau_sex === group.sex && item.cause_type.caut_name === group.typ ) {
          find = true;
          group.nb = group.nb + 1;
        }
      })
      if ( find === false) {
        nbGrp = nbGrp + 1;
        causeGroup.push({ id: nbGrp, nb: 1, sex: item.cau_sex, typ: item.cause_type.caut_name });
      }
    });
  }
  return causeGroup;
}
