import { Action, createReducer, on } from '@ngrx/store';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from 'src/app/create-article/store/createArticle.action';
import { CreateArticleStateInterface } from 'src/app/create-article/store/types/createArticleState.interface';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const _createArticleReducer = createReducer(
  initialState,
  on(createArticleAction, (state): CreateArticleStateInterface => {
    return {
      ...state,
      isSubmitting: true,
    };
  }),
  on(createArticleSuccessAction, (state): CreateArticleStateInterface => {
    return {
      ...state,
      isSubmitting: false,
    };
  }),
  on(
    createArticleFailureAction,
    (state, action): CreateArticleStateInterface => {
      return {
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      };
    }
  )
);

export function createArticleReducers(
  state: CreateArticleStateInterface,
  action: Action
) {
  return _createArticleReducer(state, action);
}
