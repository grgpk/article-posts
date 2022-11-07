import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterModule, Routes } from '@angular/router';

import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';
import { GetArticleEffect } from 'src/app/article/store/effects/getarticle.effect';
import { articleReducer } from 'src/app/article/store/reducers';
import { ArticleComponent } from 'src/app/article/components/article/article.component';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { ErrorMessageModule } from 'src/app/shared/modules/error-message/error-message.module';
import { TagListModule } from 'src/app/shared/modules/tag-list/tag-list.module';
import { DeleteArticleEffect } from 'src/app/article/store/effects/deleteArticle.effect';
import { ArticleService } from 'src/app/article/services/article.service';

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent,
  },
];

@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', articleReducer),
    LoadingModule,
    ErrorMessageModule,
    TagListModule,
  ],
  providers: [ArticleService, SharedArticleService],
})
export class ArticleModule {}
