import { Action, createReducer, on } from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from 'src/app/shared/modules/popular-tags/store/actions/getPopularTags.action';
import { PopularTagsStateInterface } from 'src/app/shared/modules/popular-tags/types/popularTagsState.interface';

const initialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const _popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state): PopularTagsStateInterface => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    getPopularTagsSuccessAction,
    (state, action): PopularTagsStateInterface => {
      return {
        ...state,
        isLoading: false,
        data: action.popularTags,
      };
    }
  ),
  on(getPopularTagsFailureAction, (state): PopularTagsStateInterface => {
    return {
      ...state,
      isLoading: false,
    };
  })
);

export function reducers(state: PopularTagsStateInterface, actiion: Action) {
  return _popularTagsReducer(state, actiion);
}
