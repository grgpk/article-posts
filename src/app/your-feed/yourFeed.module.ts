import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { FeedModule } from 'src/app/shared/modules/feed/feed.module';
import { BannerModule } from 'src/app/shared/modules/banner/banner.module';
import { PopularTagsModule } from 'src/app/shared/modules/popular-tags/popular-tags.module';
import { FeedTogglerModule } from 'src/app/shared/modules/feed-toggler/feed-toggler.module';
import { YourFeedComponent } from 'src/app/your-feed/components/your-feed/your-feed.component';

const routes: Routes = [{ path: 'feed', component: YourFeedComponent }];

@NgModule({
  declarations: [YourFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FeedModule,
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
  ],
})
export class YourFeedModule {}
