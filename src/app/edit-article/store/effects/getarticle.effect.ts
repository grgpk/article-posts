import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction,
} from 'src/app/edit-article/store/getArticle.action';

@Injectable()
export class GetArticleEffect {
  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}

  getArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({ slug }) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({ article });
          }),

          catchError(() => {
            return of(getArticleFailureAction());
          })
        );
      })
    );
  });
}
