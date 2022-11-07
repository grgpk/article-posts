import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';

import { AuthModule } from 'src/app/auth/auth.module';
import { GlobalFeedModule } from 'src/app/globalFeed/global-feed.module';
import { AuthInterceptor } from 'src/app/shared/services/authInterceptor.service';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { TopBarModule } from 'src/app/shared/modules/topBar/top-bar.module';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YourFeedModule } from 'src/app/your-feed/yourFeed.module';
import { TagFeedModule } from 'src/app/tag-feed/tag-feed.module';
import { ArticleModule } from 'src/app/article/article.module';
import { CreateArticleModule } from 'src/app/create-article/create-article.module';
import { EditArticleModule } from 'src/app/edit-article/edit-article.module';
import { SettingsModule } from 'src/app/settings/settings.module';
import { UserProfileModule } from 'src/app/user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TopBarModule,
    AuthModule,
    StoreModule.forRoot({ router: routerReducer }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    ArticleModule,
    EditArticleModule,
    SettingsModule,
    UserProfileModule,
  ],
  providers: [
    PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
