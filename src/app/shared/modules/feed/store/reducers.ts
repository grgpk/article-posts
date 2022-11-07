import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction,
} from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import { FeedStateInterface } from 'src/app/shared/modules/feed/types/feedState.interface';

const initialState: FeedStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const _feedReducer = createReducer(
  initialState,
  on(getFeedAction, (state): FeedStateInterface => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getFeedSuccessAction, (state, action): FeedStateInterface => {
    return {
      ...state,
      isLoading: false,
      data: action.feed,
    };
  }),
  on(getFeedFailureAction, (state): FeedStateInterface => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(routerNavigationAction, (): FeedStateInterface => initialState)
);

export function feedReducer(state: FeedStateInterface, action: Action) {
  return _feedReducer(state, action);
}
