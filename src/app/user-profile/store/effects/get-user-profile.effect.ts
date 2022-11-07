import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction,
} from 'src/app/user-profile/store/actions/getUserProfile.action';
import { UserProfileInterface } from 'src/app/user-profile/types/userProfile.Interface';

@Injectable()
export class GetUserProfileEffect {
  constructor(
    private actions$: Actions,
    private userProfileService: UserProfileService
  ) {}

  getUserProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileAction),
      switchMap(({ slug }) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return getUserProfileSuccessAction({ userProfile });
          }),

          catchError(() => {
            return of(getUserProfileFailureAction());
          })
        );
      })
    );
  });
}
