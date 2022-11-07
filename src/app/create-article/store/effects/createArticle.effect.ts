import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { CreateArticleService } from 'src/app/create-article/services/createArticle.service';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction,
} from 'src/app/create-article/store/createArticle.action';
import { ArticleInterface } from 'src/app/shared/types/article.interface';

@Injectable()
export class CreateArticleEffect {
  constructor(
    private actions$: Actions,
    private createArticleService: CreateArticleService,
    private router: Router
  ) {}

  createArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createArticleAction),
      switchMap(({ articleInput }) => {
        return this.createArticleService.createArticle(articleInput).pipe(
          map((article: ArticleInterface) => {
            return createArticleSuccessAction({ article });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createArticleFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    );
  });

  redirectAfterCreate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(createArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      );
    },
    { dispatch: false }
  );
}
