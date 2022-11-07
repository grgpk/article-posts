import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CreateArticleStateInterface } from 'src/app/create-article/store/types/createArticleState.interface';

export const createArticleFeatureSelector =
  createFeatureSelector<CreateArticleStateInterface>('createArticle');

export const isSubmittingSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) => {
    return createArticleState.isSubmitting;
  }
);

export const validationErrorSelector = createSelector(
  createArticleFeatureSelector,
  (createArticleState: CreateArticleStateInterface) =>
    createArticleState.validationErrors
);
