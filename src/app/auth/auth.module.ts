import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { RegisterComponent } from 'src/app/auth/components/register/register.component';
import { authReducers } from 'src/app/auth/store/reducers';
import { RegisterEffect } from 'src/app/auth/store/effects/register.effect';
import { AuthService } from 'src/app/auth/services/auth.services';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';
import { PersistanceService } from 'src/app/shared/services/persistance.service';
import { LoginEffect } from 'src/app/auth/store/effects/login.effect';
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { GetCurrentUserEffect } from 'src/app/auth/store/effects/getCurrentUser.effect';
import { UpdateCurrentUserEffect } from 'src/app/auth/store/effects/updateCurrentUser.effect';
import { LogoutEffect } from 'src/app/auth/store/effects/logout.effect';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    BackendErrorMessagesModule,
    StoreModule.forFeature('auth', authReducers),
    EffectsModule.forFeature([
      RegisterEffect,
      LoginEffect,
      GetCurrentUserEffect,
      UpdateCurrentUserEffect,
      LogoutEffect,
    ]),
  ],
  providers: [AuthService, PersistanceService],
})
export class AuthModule {}
