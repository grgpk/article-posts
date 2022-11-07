import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createArticleAction } from 'src/app/create-article/store/createArticle.action';

import {
  isSubmittingSelector,
  validationErrorSelector,
} from 'src/app/create-article/store/selectors';
import { ArticleInputInterface } from 'src/app/shared/types/article-input.interface';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';

@Component({
  selector: 'app-create-article',
  templateUrl: './createArticle.component.html',
  styleUrls: ['./createArticle.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({ articleInput }));
  }
}
