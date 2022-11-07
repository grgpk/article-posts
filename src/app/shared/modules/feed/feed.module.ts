import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedComponent } from './components/feed/feed.component';
import { FeedService } from 'src/app/shared/modules/feed/services/feed.service';
import { EffectsModule } from '@ngrx/effects';
import { GetFeedEffect } from 'src/app/shared/modules/feed/store/effects/getFeed.effect';
import { StoreModule } from '@ngrx/store';
import { feedReducer } from 'src/app/shared/modules/feed/store/reducers';
import { RouterModule } from '@angular/router';
import { ErrorMessageModule } from 'src/app/shared/modules/error-message/error-message.module';
import { LoadingModule } from 'src/app/shared/modules/loading/loading.module';
import { PaginationModule } from 'src/app/shared/modules/pagination/pagination.module';
import { TagListModule } from 'src/app/shared/modules/tag-list/tag-list.module';
import { AddToFavoritesModule } from 'src/app/shared/modules/add-to-favorites/add-to-favorites.module';

@NgModule({
  declarations: [FeedComponent],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([GetFeedEffect]),
    StoreModule.forFeature('feed', feedReducer),
    ErrorMessageModule,
    LoadingModule,
    PaginationModule,
    TagListModule,
    AddToFavoritesModule,
  ],
  exports: [FeedComponent],
  providers: [FeedService],
})
export class FeedModule {}
