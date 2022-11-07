import { Action, createReducer, on } from '@ngrx/store';
import {
  getCurrentUserAction,
  getCurrentUserFailureAction,
  getCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/getCurrentUser.action';
import {
  loginAction,
  loginFailureAction,
  loginSuccessAction,
} from 'src/app/auth/store/actions/login.action';

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from 'src/app/auth/store/actions/register.action';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';
import { updateCurrentUserSuccessAction } from 'src/app/auth/store/actions/updateCurrentUser.action';
import { AuthStateInterface } from 'src/app/auth/types/authState.interface';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null,
};

const _authReducer = createReducer(
  initialState,
  on(registerAction, (state): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: true,
      validationErrors: null,
    };
  }),
  on(registerSuccessAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    };
  }),

  on(registerFailureAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  }),
  on(loginAction, (state): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: true,
      validationErrors: null,
    };
  }),

  on(loginSuccessAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    };
  }),
  on(loginFailureAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isSubmitting: false,
      validationErrors: action.errors,
    };
  }),
  on(getCurrentUserAction, (state): AuthStateInterface => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(getCurrentUserSuccessAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: action.currentUser,
    };
  }),

  on(getCurrentUserFailureAction, (state): AuthStateInterface => {
    return {
      ...state,
      isLoading: false,
      isLoggedIn: false,
      currentUser: null,
    };
  }),
  on(updateCurrentUserSuccessAction, (state, action): AuthStateInterface => {
    return {
      ...state,
      currentUser: action.currentUser,
    };
  }),
  on(logoutAction, (): AuthStateInterface => {
    return {
      ...initialState,
      isLoggedIn: false,
    };
  })
);

export function authReducers(state: AuthStateInterface, action: Action) {
  return _authReducer(state, action);
}
