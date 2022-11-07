import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FeedModule } from 'src/app/shared/modules/feed/feed.module';
import { UserProfileComponent } from 'src/app/user-profile/components/user-profile/user-profile.component';
import { UserProfileService } from 'src/app/user-profile/services/user-profile.service';
import { GetUserProfileEffect } from 'src/app/user-profile/store/effects/get-user-profile.effect';
import { userProfileReducer } from 'src/app/user-profile/store/reducers';

const routes: Routes = [
  {
    path: 'profiles/:slug',
    component: UserProfileComponent,
  },

  {
    path: 'profiles/:slug/favorites',
    component: UserProfileComponent,
  },
];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetUserProfileEffect]),
    StoreModule.forFeature('userProfile', userProfileReducer),
    FeedModule,
  ],
  providers: [UserProfileService],
})
export class UserProfileModule {}
