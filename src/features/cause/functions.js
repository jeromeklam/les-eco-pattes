import { freeAssoApi } from '../../common';

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