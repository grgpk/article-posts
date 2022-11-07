import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/shared/modules/popular-tags/store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { GetPopularTagsEffect } from 'src/app/shared/modules/popular-tags/store/effects/getPopularTags.effect';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import { RouterModule } from '@angular/router';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { ErrorMessageModule } from 'src/app/shared/modules/error-message/error-message.module';
import { PopularTagsService } from 'src/app/shared/modules/popular-tags/services/populareTags.service';

@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('popularTags', reducers),
    EffectsModule.forFeature([GetPopularTagsEffect]),
    RouterModule,
    LoadingModule,
    ErrorMessageModule,
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService],
})
export class PopularTagsModule {}
