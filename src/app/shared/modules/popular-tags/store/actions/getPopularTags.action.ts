import { createAction, props } from '@ngrx/store';
import { AcctionTypes } from 'src/app/shared/modules/popular-tags/store/actionsTypes';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

export const getPopularTagsAction = createAction(AcctionTypes.GET_POPULAR_TAGS);
export const getPopularTagsSuccessAction = createAction(
  AcctionTypes.GET_POPULAR_TAGS_SUCCESS,
  props<{ popularTags: PopularTagType[] }>()
);
export const getPopularTagsFailureAction = createAction(
  AcctionTypes.GET_POPULAR_TAGS_FAILURE
);
