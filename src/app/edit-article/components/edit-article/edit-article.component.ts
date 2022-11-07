import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';

import {
  isSubmittingSelector,
  validationErrorSelector,
} from 'src/app/create-article/store/selectors';
import { editArticleAction } from 'src/app/edit-article/store/edit-article.action';
import { getArticleAction } from 'src/app/edit-article/store/getArticle.action';
import {
  articleSelector,
  isLoadingSelector,
} from 'src/app/edit-article/store/selectors';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { ArticleInterface } from 'src/app/shared/types/article.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss'],
})
export class EditArticleComponent implements OnInit {
  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;
  slug: string;
  isLoading$: Observable<boolean>;

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList,
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({ slug: this.slug }));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(editArticleAction({ slug: this.slug, articleInput }));
  }
}
