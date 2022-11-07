import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleFormComponent } from 'src/app/shared/modules/article-form/components/article-form/article-form.component';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';

@NgModule({
  declarations: [ArticleFormComponent],
  imports: [CommonModule, BackendErrorMessagesModule, ReactiveFormsModule],
  exports: [ArticleFormComponent],
})
export class ArticleFormModule {}
