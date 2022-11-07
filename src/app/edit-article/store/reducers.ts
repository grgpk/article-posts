import { Action, createReducer, on } from '@ngrx/store';
import {
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from 'src/app/edit-article/store/edit-article.action';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from 'src/app/edit-article/store/getArticle.action';
import { EditArticleStateInterface } from 'src/app/edit-article/store/types/edit-articleState.interface';

const initialState: EditArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationErrors: null,
};

const _editArticleReducer = createReducer(
  initialState,
  on(editArticleAction, (state): EditArticleStateInterface => {
    return {
      ...state,
      isSubmitting: true,
    };
  }),
  on(editArticleSuccessAction, (state): EditArticleStateInterface => {
    return {
      ...state,
      isSubmitting: false,
    };
  }),
  on(editArticleFailureAction, (state, action): EditArticleStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  }),
  on(getArticleAction, (state): EditArticleStateInterface => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getArticleSuccessAction, (state, action): EditArticleStateInterface => {
    return {
      ...state,
      isLoading: false,
      article: action.article,
    };
  }),
  on(getArticleFailureAction, (state): EditArticleStateInterface => {
    return {
      ...state,
      isLoading: false,
    };
  })
);

export function editArticleReducers(
  state: EditArticleStateInterface,
  action: Action
) {
  return _editArticleReducer(state, action);
}
