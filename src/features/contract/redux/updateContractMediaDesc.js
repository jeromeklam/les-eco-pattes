import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { jsonApiNormalizer, normalizedObjectUpdate, getNewJsonApi } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN,
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS,
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE,
  CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR,
} from './constants';

export function updateContractMediaDesc(ctm_id, ct_id, desc) {
  return (dispatch) => {
    dispatch({
      type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const args = {
        ct_id: ct_id,
        desc: desc,
      };
      const doRequest = freeAssoApi.put('/v1/asso/contract_media/description/' + ctm_id, getNewJsonApi('FreeAsso_ContractMediaBlob', "", args));
      doRequest.then(
        (res) => {
          dispatch({
            type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissUpdateContractMediaDescError() {
  return {
    type: CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR,
  };
}

export function useUpdateContractMediaDesc() {
  const dispatch = useDispatch();

  const { updateContractMediaDescPending, updateContractMediaDescError } = useSelector(
    state => ({
      updateContractMediaDescPending: state.contract.updateContractMediaDescPending,
      updateContractMediaDescError: state.contract.updateContractMediaDescError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(updateContractMediaDesc(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissUpdateContractMediaDescError());
  }, [dispatch]);

  return {
    updateContractMediaDesc: boundAction,
    updateContractMediaDescPending,
    updateContractMediaDescError,
    dismissUpdateContractMediaDescError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateContractMediaDescPending: true,
        updateContractMediaDescError: null,
      };

    case CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_SUCCESS:
      // The request is success
      return {
        ...state,
        updateContractMediaDescPending: false,
        updateContractMediaDescError: null,
      };

    case CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        updateContractMediaDescPending: false,
        updateContractMediaDescError: error,
      };

    case CONTRACT_UPDATE_CONTRACT_MEDIA_DESC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateContractMediaDescError: null,
      };

    default:
      return state;
  }
}
