import { Component } from '@angular/core';
import { ComponentBase } from './../../../../common/helpers/mixins/component-base';
import { SettingService } from './../../services/settings/setting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends ComponentBase {

  accessToken: string = '';
  tabs: ViewTabs[] = ['info', 'resume', 'projects'];
  activeTab: ViewTabs = 'info';

  constructor(
    public settings: SettingService,
  ) {
    super();
  }

  check(){
    this.recordSubscription(
      this.settings.auth().subscribe()
    )
  }
}

type ViewTabs = 'info' | 'resume' | 'skills' | 'projects';