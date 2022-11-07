import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { combineLatest, filter, map, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { getUserProfileAction } from 'src/app/user-profile/store/actions/getUserProfile.action';
import {
  errorSelector,
  isLoadingSelector,
  userProfileSelector,
} from 'src/app/user-profile/store/selectors';
import { UserProfileInterface } from 'src/app/user-profile/types/userProfile.Interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfile: UserProfileInterface;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  userProfileSubscription: Subscription;
  slug: string;
  isCurrentUserProfile$: Observable<boolean>;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));

    this.isCurrentUserProfile$ = combineLatest(
      this.store.pipe(select(currentUserSelector), filter(Boolean)),
      this.store.pipe(select(userProfileSelector), filter(Boolean))
    ).pipe(
      map(
        ([currentUser, userProfile]: [
          CurrentUserInterface,
          UserProfileInterface
        ]) => {
          return currentUser.username === userProfile.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.userProfileSubscription = this.store
      .pipe(select(userProfileSelector))
      .subscribe((userProfile: UserProfileInterface) => {
        this.userProfile = userProfile;
      });
    this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.fetchUserProfile();
    });
  }

  getApiUrl(): string {
    const isFavorites = this.router.url.includes('favorites');
    return isFavorites
      ? `/api/articles?favorited=${this.slug}`
      : `/api/articles?author=${this.slug}`;
  }

  fetchUserProfile(): void {
    this.store.dispatch(getUserProfileAction({ slug: this.slug }));
  }
}
