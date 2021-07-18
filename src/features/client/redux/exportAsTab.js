import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNewJsonApi, objectToQueryString } from 'jsonapi-front';
import mime from 'mime-types'
import {
  CLIENT_EXPORT_AS_TAB_BEGIN,
  CLIENT_EXPORT_AS_TAB_SUCCESS,
  CLIENT_EXPORT_AS_TAB_FAILURE,
  CLIENT_EXPORT_AS_TAB_DISMISS_ERROR,
} from './constants';
import { downloadBlob } from '../../ui';
import { freeAssoApi } from '../../../common';

export function exportAsTab(mode = 'all') {
  return (dispatch, getState) => {
    dispatch({
      type: CLIENT_EXPORT_AS_TAB_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      let filters = getState().client.filters.asJsonApiObject();
      if (mode === 'selection') {
        if (!filters['filter']['and']) {
          filters['filter']['and'] = {cli_id: ''};
        }
        filters['filter']['and']['cli_id'] = {in: getState().client.selected.join(',')};
      }
      let params = {
        page: { number: 1, size: 99999999 },
        ...filters,
      };
      let sort = '';
      getState().client.sort.forEach(elt => {
        let add = elt.col;
        if (elt.way === 'down') {
          add = '-' + add;
        }
        if (sort === '') {
          sort = add;
        } else {
          sort = sort + ',' + add;
        }
      });
      if (sort !== '') {
        params.sort = sort;
      }
      const addUrl = objectToQueryString(params);
      const options = getNewJsonApi('FreeFW_PrintOptions', null, {
        prt_name: 'Client',
        prt_type: 'XLSX',
      });
      const doRequest = freeAssoApi.post('/v1/asso/client/export' + addUrl, options, {
        responseType: 'arraybuffer',
      });
      doRequest.then(
        (res) => {
          let resRes = true;
          if (res.headers && res.headers['content-type'].indexOf('json') > 0) {
            resRes = false;
          } else {
            try {
              const type = res.headers['content-type'] || 'application/octet-stream';
              const extension = mime.extension(type);
              downloadBlob(res.data, type, 'FreeAsso_Client.' + extension);
            } catch (ex) {

            }
          }
          dispatch({
            type: CLIENT_EXPORT_AS_TAB_SUCCESS,
            data: res,
          });
          resolve(resRes);
        },
        (err) => {
          dispatch({
            type: CLIENT_EXPORT_AS_TAB_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissExportAsTabError() {
  return {
    type: CLIENT_EXPORT_AS_TAB_DISMISS_ERROR,
  };
}

export function useExportAsTab() {
  const dispatch = useDispatch();

  const { exportAsTabPending, exportAsTabError } = useSelector(
    state => ({
      exportAsTabPending: state.client.exportAsTabPending,
      exportAsTabError: state.client.exportAsTabError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(exportAsTab(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissExportAsTabError());
  }, [dispatch]);

  return {
    exportAsTab: boundAction,
    exportAsTabPending,
    exportAsTabError,
    dismissExportAsTabError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_EXPORT_AS_TAB_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        exportAsTabPending: true,
        exportAsTabError: null,
      };

    case CLIENT_EXPORT_AS_TAB_SUCCESS:
      // The request is success
      return {
        ...state,
        exportAsTabPending: false,
        exportAsTabError: null,
      };

    case CLIENT_EXPORT_AS_TAB_FAILURE:
      // The request is failed
      return {
        ...state,
        exportAsTabPending: false,
        exportAsTabError: action.data.error,
      };

    case CLIENT_EXPORT_AS_TAB_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        exportAsTabError: null,
      };

    default:
      return state;
  }
}
