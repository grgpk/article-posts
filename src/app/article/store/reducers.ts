import { Action, createReducer, on } from '@ngrx/store';
import { routerNavigationAction } from '@ngrx/router-store';

import { ArticleStateInterface } from 'src/app/article/types/articleState.interface';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from 'src/app/article/store/actions/getArticle.action';

const initialState: ArticleStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const _articleReducer = createReducer(
  initialState,
  on(getArticleAction, (state): ArticleStateInterface => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getArticleSuccessAction, (state, action): ArticleStateInterface => {
    return {
      ...state,
      isLoading: false,
      data: action.article,
    };
  }),
  on(getArticleFailureAction, (state): ArticleStateInterface => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(routerNavigationAction, (): ArticleStateInterface => initialState)
);

export function articleReducer(state: ArticleStateInterface, action: Action) {
  return _articleReducer(state, action);
}
