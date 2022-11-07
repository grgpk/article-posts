import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreateArticleComponent } from 'src/app/create-article/components/create-article/createArticle.component';
import { CreateArticleService } from 'src/app/create-article/services/createArticle.service';
import { CreateArticleEffect } from 'src/app/create-article/store/effects/createArticle.effect';
import { createArticleReducers } from 'src/app/create-article/store/reducers';
import { ArticleFormModule } from 'src/app/shared/modules/article-form/article-form.module';

const routes: Routes = [
  {
    path: 'articles/new',
    component: CreateArticleComponent,
  },
];

@NgModule({
  declarations: [CreateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([CreateArticleEffect]),
    StoreModule.forFeature('createArticle', createArticleReducers),
  ],
  providers: [CreateArticleService],
})
export class CreateArticleModule {}
