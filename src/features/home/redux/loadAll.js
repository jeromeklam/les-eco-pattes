import {
  HOME_LOAD_ALL_BEGIN,
  HOME_LOAD_ALL_SUCCESS,
  HOME_LOAD_ALL_FAILURE,
  HOME_LOAD_ALL_DISMISS_ERROR,
} from './constants';
import { loadMore as loadMoreLang } from '../../lang/redux/loadMore';
import { loadMore as loadMoreData } from '../../data/redux/loadMore';
import { loadMore as loadMoreConfig } from '../../config/redux/loadMore';
import { loadMore as loadMoreCountry } from '../../country/redux/loadMore';
import { loadMore as loadMoreSiteType } from '../../site-type/redux/loadMore';
import { loadMore as loadMoreCauseType } from '../../cause-type/redux/loadMore';
import { loadMore as loadMoreCauseMainType } from '../../cause-main-type/redux/loadMore';
import { loadMore as loadMoreClientType } from '../../client-type/redux/loadMore';
import { loadMore as loadMoreClientCategory } from '../../client-category/redux/loadMore';
import { loadMore as loadMoreDashboard } from '../../dashboard/redux/loadMore';
import { loadMore as loadMoreAlertCategory } from '../../alert-category/redux/loadMore';
import { loadCliSpec } from '../../client/redux/loadCliSpec';

export function loadAll(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: HOME_LOAD_ALL_BEGIN,
    });
    const promise = Promise.all([
      dispatch(loadMoreLang()),
      dispatch(loadMoreData()),
      dispatch(loadMoreConfig()),
      dispatch(loadMoreCountry()),
      dispatch(loadMoreSiteType()),
      dispatch(loadMoreCauseType()),
      dispatch(loadMoreCauseMainType()),
      dispatch(loadMoreClientType()),
      dispatch(loadMoreClientCategory()),
      dispatch(loadMoreDashboard()),
      dispatch(loadCliSpec()),
      dispatch(loadMoreAlertCategory()),
    ]);
    return promise.then(
      res => {
        dispatch({
          type: HOME_LOAD_ALL_SUCCESS,
          data: res,
        });
      },
      err => {
        console.log(err);
        dispatch({
          type: HOME_LOAD_ALL_FAILURE,
          data: { error: err },
        });
      },
    );
  };
}

export function dismissLoadAllError() {
  return {
    type: HOME_LOAD_ALL_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case HOME_LOAD_ALL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadAllPending: true,
        loadAllError: null,
      };

    case HOME_LOAD_ALL_SUCCESS:
      // The request is success
      return {
        ...state,
        loadAllPending: false,
        loadAllError: null,
        loadAllFinish: true,
      };

    case HOME_LOAD_ALL_FAILURE:
      // The request is failed
      return {
        ...state,
        loadAllPending: false,
        loadAllError: action.data.error,
      };

    case HOME_LOAD_ALL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadAllError: null,
      };

    default:
      return state;
  }
}
