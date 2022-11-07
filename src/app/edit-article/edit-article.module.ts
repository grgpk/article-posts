import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CreateArticleComponent } from 'src/app/create-article/components/create-article/createArticle.component';
import { EditArticleComponent } from 'src/app/edit-article/components/edit-article/edit-article.component';
import { EditArticleService } from 'src/app/edit-article/services/edit-article.service';
import { EditArticleEffect } from 'src/app/edit-article/store/effects/edit-article.effect';
import { GetArticleEffect } from 'src/app/edit-article/store/effects/getarticle.effect';
import { editArticleReducers } from 'src/app/edit-article/store/reducers';
import { ArticleFormModule } from 'src/app/shared/modules/article-form/article-form.module';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { ArticleService as SharedArticleService } from 'src/app/shared/services/article.service';

const routes: Routes = [
  {
    path: 'articles/:slug/edit',
    component: EditArticleComponent,
  },
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ArticleFormModule,
    EffectsModule.forFeature([EditArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', editArticleReducers),
    LoadingModule,
  ],
  providers: [EditArticleService, SharedArticleService],
})
export class EditArticleModule {}
