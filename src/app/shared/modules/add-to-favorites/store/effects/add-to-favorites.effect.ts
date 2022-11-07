import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { AddToFavoritesService } from 'src/app/shared/modules/add-to-favorites/services/add-to-favorites.service';
import {
  addTofavoritesAction,
  addTofavoritesFailureAction,
  addTofavoritesSuccessAction,
} from 'src/app/shared/modules/add-to-favorites/store/actions/addToFavorites.action';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Injectable()
export class AddToFavoritesEffect {
  constructor(
    private actions$: Actions,
    private addToFavoritesService: AddToFavoritesService
  ) {}

  addToFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addTofavoritesAction),
      switchMap(({ isFavorited, slug }) => {
        const article$ = isFavorited
          ? this.addToFavoritesService.removeFromFavorites(slug)
          : this.addToFavoritesService.addToFavorites(slug);
        return article$.pipe(
          map((article: ArticleInterface) => {
            return addTofavoritesSuccessAction({ article });
          }),

          catchError(() => {
            return of(addTofavoritesFailureAction());
          })
        );
      })
    );
  });
}
