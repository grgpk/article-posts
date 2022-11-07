import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { stringify, parseUrl } from 'query-string';

import { getFeedAction } from 'src/app/shared/modules/feed/store/actions/getFeed.action';
import {
  errorSelector,
  feedDataSelector,
  isLoadingSelector,
} from 'src/app/shared/modules/feed/store/selectors';
import { GetFeedResponseInterface } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, OnDestroy {
  @Input('apiUrl') apiUrlProps: string;

  feed$: Observable<GetFeedResponseInterface | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;
  limit = environment.limit;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params['page'] || '1');
        this.fetchFeed();
      }
    );
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedDataSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  fetchFeed(): void {
    const offset = this.currentPage * this.limit - this.limit;
    const parsedUrl = parseUrl(this.apiUrlProps);
    const stringifiedparams = stringify({
      limit: this.limit,
      offset,
      ...parsedUrl.query,
    });
    const apiUrlWithParams = `${parsedUrl.url}?${stringifiedparams}`;
    this.store.dispatch(getFeedAction({ url: apiUrlWithParams }));
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription && this.queryParamsSubscription.unsubscribe();
  }
}
