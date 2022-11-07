import { Action, createReducer, on } from '@ngrx/store';
import {
  updateCurrentUserAction,
  updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction,
} from 'src/app/auth/store/actions/updateCurrentUser.action';
import { SettingsStateInterface } from 'src/app/settings/store/types/settingsState.interface';

const initialState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null,
};

const _settingsReducer = createReducer(
  initialState,
  on(updateCurrentUserAction, (state): SettingsStateInterface => {
    return {
      ...state,
      isSubmitting: true,
    };
  }),
  on(updateCurrentUserSuccessAction, (state): SettingsStateInterface => {
    return {
      ...state,
      isSubmitting: false,
    };
  }),
  on(
    updateCurrentUserFailureAction,
    (state, action): SettingsStateInterface => {
      return {
        ...state,
        isSubmitting: false,
        validationErrors: action.errors,
      };
    }
  )
);

export function settingsReducer(state: SettingsStateInterface, action: Action) {
  return _settingsReducer(state, action);
}
