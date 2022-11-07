import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProfileStateInterface } from 'src/app/user-profile/types/userProfileState.interface';

export const userProfileFeatureSelector =
  createFeatureSelector<UserProfileStateInterface>('userProfile');

export const userProfileSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.data
);

export const isLoadingSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
);

export const errorSelector = createSelector(
  userProfileFeatureSelector,
  (userProfileState: UserProfileStateInterface) => userProfileState.error
);
