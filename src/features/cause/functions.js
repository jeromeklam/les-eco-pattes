import { normalizedObjectModeler, objectToQueryString, jsonApiNormalizer } from 'jsonapi-front';
import { FILTER_MODE_AND, FILTER_OPER_EQUAL } from 'react-bootstrap-front';
import { freeAssoApi } from '../../common';
import { getInitFilters } from './redux/initFilters';

/**
 *
 */
export const getMedias = (cause_id, caum_type) => {
  const promise = new Promise((resolve, reject) => {
    const filter = {
      filter: {
        cau_id: { eq: cause_id },
        caum_type: { eq: caum_type },
      },
    };
    const addUrl = objectToQueryString(filter);
    const doRequest = freeAssoApi.get('/v1/asso/cause_media' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeAsso_CauseMedia');
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
          const list = jsonApiNormalizer(res.data);
          const model = normalizedObjectModeler(list, 'FreeAsso_Cause', cau_id, { eager: eager });
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
};

/**
 *
 */
export const getCauses = (mode, site_id, cause, ids = []) => {
  const promise = new Promise((resolve, reject) => {
    let params = {
      filter: {},
    };
    if (mode === 'site') {
      params = {
        filter: {
          site_id: { eq: site_id },
          cau_to: { 'empty': null }
        },
      };
    } else {
      if (mode === 'list') {
        params.filter.cau_id = { in: ids };
      } else {
        if (cause.cau_sex === 'M') {
          params.filter['parent1.cau_id'] = cause.id;
        } else {
          params.filter['parent2.cau_id'] = cause.id;
        }
      }
    }
    params.sort = 'cau_code';
    const addUrl = objectToQueryString(params);
    const doRequest = freeAssoApi.get('/v1/asso/cause' + addUrl, {});
    doRequest.then(
      res => {
        if (res.data && res.data.data) {
          const list = jsonApiNormalizer(res.data);
          const models = normalizedObjectModeler(list, 'FreeAsso_Cause');
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
export const downloadCauseMediaBlob = caum_id => {
  const promise = new Promise((resolve, reject) => {
    const doRequest = freeAssoApi.get('/v1/asso/cause_media_blob/download/' + caum_id, {
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
  let nbGrp = 0;
  if (causeList) {
    causeList.forEach(item => {
      find = false;
      causeGroup.forEach(group => {
        if (item.cau_sex === group.sex && item.cause_type.caut_name === group.typ) {
          find = true;
          group.nb = group.nb + 1;
        }
      });
      if (find === false) {
        nbGrp = nbGrp + 1;
        causeGroup.push({ id: nbGrp, nb: 1, sex: item.cau_sex, typ: item.cause_type.caut_name });
      }
    });
  }
  return causeGroup;
}
