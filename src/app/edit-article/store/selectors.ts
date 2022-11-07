import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EditArticleStateInterface } from 'src/app/edit-article/store/types/edit-articleState.interface';

export const editArticleFeatureSelector =
  createFeatureSelector<EditArticleStateInterface>('editArticle');

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => {
    return editArticleState.isSubmitting;
  }
);

export const validationErrorSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationErrors
);

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => {
    return editArticleState.article;
  }
);

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => {
    return editArticleState.isLoading;
  }
);
