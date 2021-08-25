import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from './../../common/app-common.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsFormInfoComponent } from './tabs/settings-form-info/settings-form-info.component';
import { SettingsFormProjectsComponent } from './tabs/settings-form-projects/settings-form-projects.component';
import { SettingsFormResumeComponent } from './tabs/settings-form-resume/settings-form-resume.component';


@NgModule({
  declarations: [
    SettingsComponent,
    SettingsFormInfoComponent,
    SettingsFormResumeComponent,
    SettingsFormProjectsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonModule,
  ]
})
export class SettingsModule { }
