import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';

import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { EditArticleService } from 'src/app/edit-article/services/edit-article.service';
import {
  editArticleAction,
  editArticleFailureAction,
  editArticleSuccessAction,
} from 'src/app/edit-article/store/edit-article.action';

@Injectable()
export class EditArticleEffect {
  constructor(
    private actions$: Actions,
    private editArticleService: EditArticleService,
    private router: Router
  ) {}

  editArticle$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editArticleAction),
      switchMap(({ slug, articleInput }) => {
        return this.editArticleService.updateArticle(slug, articleInput).pipe(
          map((article: ArticleInterface) => {
            return editArticleSuccessAction({ article });
          }),

          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              editArticleFailureAction({ errors: errorResponse.error.errors })
            );
          })
        );
      })
    );
  });

  redirectAfterEdit$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(editArticleSuccessAction),
        tap(({ article }) => {
          this.router.navigate(['/articles', article.slug]);
        })
      );
    },
    { dispatch: false }
  );
}
