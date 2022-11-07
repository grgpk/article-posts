import { Action, createReducer, on } from '@ngrx/store';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from 'src/app/user-profile/store/actions/getUserProfile.action';
import { UserProfileStateInterface } from 'src/app/user-profile/types/userProfileState.interface';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null,
};

const _userProfileReducer = createReducer(
  initialState,
  on(getUserProfileAction, (state): UserProfileStateInterface => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    getUserProfileSuccessAction,
    (state, action): UserProfileStateInterface => {
      return {
        ...state,
        isLoading: false,
        data: action.userProfile,
      };
    }
  ),
  on(getUserProfileFailureAction, (state): UserProfileStateInterface => {
    return {
      ...state,
      isLoading: false,
    };
  })
);

export function userProfileReducer(
  state: UserProfileStateInterface,
  action: Action
) {
  return _userProfileReducer(state, action);
}
