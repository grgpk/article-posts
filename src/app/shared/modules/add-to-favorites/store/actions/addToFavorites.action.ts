import { createAction, props } from '@ngrx/store';
import { ActionTypes } from 'src/app/shared/modules/add-to-favorites/store/actionTypes';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

export const addTofavoritesAction = createAction(
  ActionTypes.ADD_TO_FAVORITES,
  props<{ isFavorited: boolean; slug: string }>()
);

export const addTofavoritesSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVORITES_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const addTofavoritesFailureAction = createAction(
  ActionTypes.ADD_TO_FAVORITES_FAILURE
);
