import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { PopularTagsService } from 'src/app/shared/modules/popular-tags/services/populareTags.service';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction,
} from 'src/app/shared/modules/popular-tags/store/actions/getPopularTags.action';
import { PopularTagType } from 'src/app/shared/types/popularTag.type';

@Injectable()
export class GetPopularTagsEffect {
  constructor(
    private actions$: Actions,
    private popularTagsService: PopularTagsService
  ) {}

  getPopularTags$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getPopularTagsAction),
      switchMap(() => {
        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({ popularTags });
          }),

          catchError(() => {
            return of(getPopularTagsFailureAction());
          })
        );
      })
    );
  });
}
