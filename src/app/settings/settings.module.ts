import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SettingsComponent } from 'src/app/settings/components/settings/settings.component';
import { settingsReducer } from 'src/app/settings/store/reducers';
import { BackendErrorMessagesModule } from 'src/app/shared/modules/backendErrorMessages/backendErrorMessages.module';

const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
  },
];

@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('settings', settingsReducer),
    BackendErrorMessagesModule,
    ReactiveFormsModule,
  ],
})
export class SettingsModule {}
