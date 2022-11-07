import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subscription } from 'rxjs';
import { currentUserSelector } from 'src/app/auth/store/selectors';
import { CurrentUserInputInterface } from 'src/app/shared/types/currentUserInput.interface';
import {
  isSubmittingSelector,
  validationErrorsSelector,
} from 'src/app/settings/store/selectors';
import { BackendErrorsInterface } from 'src/app/shared/types/backendErrors.interface';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';
import { updateCurrentUserAction } from 'src/app/auth/store/actions/updateCurrentUser.action';
import { logoutAction } from 'src/app/auth/store/actions/sync.action';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  form: FormGroup;
  currentUserSubscription: Subscription;
  currentUser: CurrentUserInterface;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface>;

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.initializeListeners();
  }

  initializeListeners(): void {
    this.currentUserSubscription = this.store
      .pipe(select(currentUserSelector), filter(Boolean))
      .subscribe((currentUser: CurrentUserInterface) => {
        this.currentUser = currentUser;
        this.initializeForm();
      });
  }

  initializeForm(): void {
    this.form = this.fb.group({
      image: this.currentUser.image,
      userName: this.currentUser.username,
      bio: this.currentUser.bio,
      email: this.currentUser.email,
      password: '',
    });
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector));
  }

  submit(): void {
    const currentUserInput: CurrentUserInputInterface = {
      ...this.currentUser,
      ...this.form.value,
    };
    this.store.dispatch(updateCurrentUserAction({ currentUserInput }));
  }

  logout(): void {
    this.store.dispatch(logoutAction());
  }

  ngOnDestroy(): void {
    this.currentUserSubscription && this.currentUserSubscription.unsubscribe();
  }
}
